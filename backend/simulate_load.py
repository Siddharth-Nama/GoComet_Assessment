import requests
import random
import time
import threading

API_BASE_URL = "http://localhost:8000/api/leaderboard"

def submit_score(user_id):
    try:
        score = random.randint(100, 10000)
        # We need to make sure user exists first, or just rely on random IDs if we seeded them
        # For simulation, let's assume users 1 to 10000 exist or create them if API supported it.
        # Our seed_users created users with IDs.
        # But we don't know the IDs easily. They are serial integers.
        # So random int should work if seeded.
        
        response = requests.post(f"{API_BASE_URL}/submit", json={"user_id": user_id, "score": score})
        # print(f"Submit: {response.status_code}")
    except Exception as e:
        print(f"Error submitting: {e}")

def get_top_players():
    try:
        response = requests.get(f"{API_BASE_URL}/top")
        # print(f"Top: {response.status_code}")
        return response.json()
    except Exception as e:
        print(f"Error getting top: {e}")
        return []

def get_user_rank(user_id):
    try:
        response = requests.get(f"{API_BASE_URL}/rank/{user_id}")
        # print(f"Rank: {response.status_code}")
        return response.json()
    except Exception as e:
        print(f"Error getting rank: {e}")
        return {}

def user_behavior(user_id):
    for _ in range(5): # Each thread does a few actions
        action = random.choice(['submit', 'check_rank', 'check_top'])
        if action == 'submit':
            submit_score(user_id)
        elif action == 'check_rank':
            get_user_rank(user_id)
        elif action == 'check_top':
            get_top_players()
        time.sleep(random.uniform(0.1, 0.5))

def run_simulation():
    print("Starting simulation with 50 threads...")
    threads = []
    for i in range(50):
        # random user id assuming we seeded at least 1000 users
        user_id = random.randint(1, 1000) 
        t = threading.Thread(target=user_behavior, args=(user_id,))
        threads.append(t)
        t.start()
    
    for t in threads:
        t.join()
    print("Simulation complete.")

if __name__ == "__main__":
    run_simulation()
