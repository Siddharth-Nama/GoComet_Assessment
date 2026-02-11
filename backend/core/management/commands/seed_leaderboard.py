from django.core.management.base import BaseCommand
from core.models import User, GameSession, Leaderboard
from django.db.models import Sum

class Command(BaseCommand):
    help = 'Aggregates game sessions to populate the leaderboard'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing leaderboard...')
        Leaderboard.objects.all().delete()

        self.stdout.write('Aggregating scores...')
        # Aggregate total score for each user
        user_scores = GameSession.objects.values('user').annotate(total_score=Sum('score'))
        
        self.stdout.write(f'Found {len(user_scores)} users with scores. Populating leaderboard...')

        batch_size = 1000
        leaderboard_entries = []
        count = 0

        for entry in user_scores:
            user_id = entry['user']
            total_score = entry['total_score']
            leaderboard_entries.append(Leaderboard(user_id=user_id, total_score=total_score))
            
            if len(leaderboard_entries) >= batch_size:
                Leaderboard.objects.bulk_create(leaderboard_entries)
                count += len(leaderboard_entries)
                leaderboard_entries = []
                self.stdout.write(f'Processed {count} entries...')

        if leaderboard_entries:
            Leaderboard.objects.bulk_create(leaderboard_entries)
            count += len(leaderboard_entries)

        self.stdout.write(self.style.SUCCESS(f'Successfully populated leaderboard with {count} entries'))
