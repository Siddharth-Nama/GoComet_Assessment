from django.db import models

class User(models.Model):
    username = models.CharField(max_length=255, unique=True)
    join_date = models.DateTimeField(auto_now_add=True, null=True) # null = true because to run the SQL Queries provided in the assignment

    def __str__(self):
        return self.username

    class Meta:
        db_table = "users"

class GameSession(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField(db_index=True)
    game_mode = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return f"{self.user_id.username} - {self.score}"

    class Meta:
        db_table = "game_sessions"

class Leaderboard(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    total_score = models.IntegerField(default=0, db_index=True)
    rank = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.user_id.username} - Rank: {self.rank}"

    class Meta:
        db_table = "leaderboard"
        indexes = [
            models.Index(fields=['-total_score']),
        ]
