from django.core.management.base import BaseCommand
from core.models import User
from django.utils import timezone
import random

class Command(BaseCommand):
    help = 'Seeds the database with users'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Indicates the number of users to be created')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        self.stdout.write(f'Creating {total} users...')
        
        batch_size = 1000
        users = []
        for i in range(total):
            username = f'user_{random.randint(1, 100000000)}_{i}'
            users.append(User(username=username, join_date=timezone.now()))
            
            if len(users) >= batch_size:
                User.objects.bulk_create(users, ignore_conflicts=True)
                users = []
                self.stdout.write(f'Created {i+1} users...')
        
        if users:
            User.objects.bulk_create(users, ignore_conflicts=True)

        self.stdout.write(self.style.SUCCESS(f'Successfully created {total} users'))
