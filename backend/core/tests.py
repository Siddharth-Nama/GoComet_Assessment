from django.test import TestCase, Client
from django.urls import reverse
from .models import User, GameSession, Leaderboard
from django.db.utils import IntegrityError
from rest_framework import status

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

class ViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create(username="player1")

    def test_submit_score(self):
        url = reverse('submit-score')
        data = {'user_id': self.user.id, 'score': 150}
        response = self.client.post(url, data, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(GameSession.objects.count(), 1)
        self.assertEqual(Leaderboard.objects.get(user=self.user).total_score, 150)

    def test_get_top_scores(self):
        # Create multiple scores
        u2 = User.objects.create(username="player2")
        Leaderboard.objects.create(user=self.user, total_score=100)
        Leaderboard.objects.create(user=u2, total_score=200)

        url = reverse('top-scores')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Verify ordering (player2 should be first)
        self.assertEqual(response.data[0]['username'], 'player2')

    def test_get_player_rank(self):
        u2 = User.objects.create(username="player2")
        Leaderboard.objects.create(user=self.user, total_score=100)
        Leaderboard.objects.create(user=u2, total_score=200)

        url = reverse('player-rank', args=[self.user.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['rank'], 2)  # Should be 2nd
