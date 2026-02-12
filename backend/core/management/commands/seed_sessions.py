from django.core.management.base import BaseCommand
from core.models import User, GameSession
from django.utils import timezone
import random

class Command(BaseCommand):
    help = 'Seeds the database with game sessions'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Indicates the number of sessions to be created')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        self.stdout.write(f'Creating {total} game sessions...')
        
        user_ids = list(User.objects.values_list('id', flat=True))
        if not user_ids:
            self.stdout.write(self.style.ERROR('No users found. Please run seed_users first.'))
            return

        batch_size = 1000
        sessions = []
        for i in range(total):
            user_id = random.choice(user_ids)
            score = random.randint(1, 1000)
            game_mode = random.choice(['solo', 'team', 'practice'])
            sessions.append(GameSession(user_id=user_id, score=score, game_mode=game_mode, timestamp=timezone.now()))
            
            if len(sessions) >= batch_size:
                GameSession.objects.bulk_create(sessions)
                sessions = []
                self.stdout.write(f'Created {i+1} sessions...')
        
        if sessions:
            GameSession.objects.bulk_create(sessions)

        self.stdout.write(self.style.SUCCESS(f'Successfully created {total} game sessions'))
