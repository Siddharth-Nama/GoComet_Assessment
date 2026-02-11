from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, GameSession, Leaderboard
from .serializers import SubmitScoreSerializer, LeaderboardSerializer
from django.db import transaction
from django.db.models import F

class SubmitScoreView(APIView):
    def post(self, request):
        serializer = SubmitScoreSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.validated_data['user_id']
            score = serializer.validated_data['score']

            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

            try:
                with transaction.atomic():
                    # Create GameSession
                    GameSession.objects.create(user=user, score=score, game_mode='solo')

                    # Update Leaderboard with locking to prevent race conditions
                    # Use select_for_update() to lock the row if it exists
                    # Note: select_for_update() requires a transaction
                    
                    # We use a try-except block or get_or_create. 
                    # For simple atomic increments, F() is good, but if we need to create, we need care.
                    
                    leaderboard, created = Leaderboard.objects.select_for_update().get_or_create(
                        user=user, 
                        defaults={'total_score': 0} # Initialize with 0, then add score
                    )
                    
                    # If we just created it, total_score is 0.
                    # We adhere to the atomic update:
                    leaderboard.total_score = F('total_score') + score
                    leaderboard.save()
                    
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'message': 'Score submitted successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TopScoresView(APIView):
    def get(self, request):
        top_scores = Leaderboard.objects.select_related('user').order_by('-total_score')[:10]
        serializer = LeaderboardSerializer(top_scores, many=True)
        return Response(serializer.data)

class PlayerRankView(APIView):
    def get(self, request, user_id):
        try:
            leaderboard = Leaderboard.objects.get(user_id=user_id)
        except Leaderboard.DoesNotExist:
            return Response({'error': 'User not found in leaderboard'}, status=status.HTTP_404_NOT_FOUND)
        
        # Calculate rank dynamically
        rank = Leaderboard.objects.filter(total_score__gt=leaderboard.total_score).count() + 1
        
        return Response({
            'user_id': user_id,
            'rank': rank,
            'total_score': leaderboard.total_score
        })
