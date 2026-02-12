from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, GameSession, Leaderboard
from .serializers import SubmitScoreSerializer, LeaderboardSerializer
from django.db import transaction
from django.db.models import F
from django.core.cache import cache

class SubmitScoreView(APIView):
    def post(self, request):
        serializer = SubmitScoreSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data['user_id']
            score = serializer.validated_data['score']

            try:
                with transaction.atomic():
                    # Check if user exists
                    user = User.objects.get(id=user_id)
                    
                    # Create Game Session (Audit Log)
                    GameSession.objects.create(user_id=user_id, score=score, game_mode='solo')

                    # Update Leaderboard with concurrency lock
                    # We utilize select_for_update() to lock the row for this transaction
                    leaderboard, created = Leaderboard.objects.select_for_update().get_or_create(
                        user_id=user_id,
                        defaults={'total_score': 0}
                    )
                    
                    # Update score
                    leaderboard.total_score = F('total_score') + score
                    leaderboard.save()
                    
                    # Refresh from DB to get the updated value (since F() returns an expression)
                    leaderboard.refresh_from_db()
                
                # Invalidate Cache
                cache.delete('top_scores')
                
                return Response({
                    'message': 'Score submitted successfully',
                    'current_total': leaderboard.total_score
                }, status=status.HTTP_201_CREATED)
                    
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TopScoresView(APIView):
    def get(self, request):
        # Check cache first
        top_scores_data = cache.get('top_scores')
        
        if top_scores_data is None:
            top_scores = Leaderboard.objects.select_related('user_id').order_by('-total_score')[:10]
            serializer = LeaderboardSerializer(top_scores, many=True)
            top_scores_data = serializer.data
            cache.set('top_scores', top_scores_data, timeout=60)
            
        return Response(top_scores_data)

class PlayerRankView(APIView):
    def get(self, request, user_id):
        try:
            leaderboard = Leaderboard.objects.get(user_id=user_id)
        except Leaderboard.DoesNotExist:
            return Response({'error': 'User not found in leaderboard'}, status=status.HTTP_404_NOT_FOUND)
        
        rank = Leaderboard.objects.filter(total_score__gt=leaderboard.total_score).count() + 1
        
        return Response({
            'user_id': user_id,
            'username': leaderboard.user_id.username,
            'rank': rank,
            'total_score': leaderboard.total_score
        })
