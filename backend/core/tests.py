from django.test import TestCase
from .models import User, GameSession, Leaderboard
from django.db.utils import IntegrityError

class ModelTests(TestCase):
    def test_user_creation(self):
        user = User.objects.create(username="testuser")
        self.assertEqual(user.username, "testuser")
        self.assertIsNotNone(user.join_date)

    def test_GameSession_creation(self):
        user = User.objects.create(username="gamer")
        session = GameSession.objects.create(user=user, score=100, game_mode="solo")
        self.assertEqual(session.score, 100)
        self.assertEqual(session.user, user)

    def test_leaderboard_creation(self):
        user = User.objects.create(username="top_player")
        leaderboard = Leaderboard.objects.create(user=user, total_score=500, rank=1)
        self.assertEqual(leaderboard.total_score, 500)
        self.assertEqual(leaderboard.rank, 1)

    def test_duplicate_username(self):
        User.objects.create(username="unique")
        with self.assertRaises(IntegrityError):
            User.objects.create(username="unique")
