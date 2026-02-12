from rest_framework import serializers
from .models import User, GameSession, Leaderboard

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'join_date']

class GameSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSession
        fields = ['user_id', 'score', 'game_mode', 'timestamp']

class LeaderboardSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user_id.username', read_only=True)

    class Meta:
        model = Leaderboard
        fields = ['user_id', 'username', 'total_score', 'rank']

class SubmitScoreSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    score = serializers.IntegerField()
