from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User, GameSession, Leaderboard
from .serializers import SubmitScoreSerializer, LeaderboardSerializer
from django.db import transaction

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

            # Create GameSession
            GameSession.objects.create(user=user, score=score, game_mode='solo')

            # Update Leaderboard
            leaderboard, created = Leaderboard.objects.get_or_create(user=user)
            leaderboard.total_score += score
            leaderboard.save()

            return Response({'message': 'Score submitted successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TopScoresView(APIView):
    def get(self, request):
        top_scores = Leaderboard.objects.select_related('user').order_by('-total_score')[:10]
        serializer = LeaderboardSerializer(top_scores, many=True)
        return Response(serializer.data)
