# 🔌 API Documentation

Base URL: `https://gocomet-assessment.onrender.com/api/leaderboard`

## Endpoints

### 1. Submit Score
*   **URL**: `/submit`
*   **Method**: `POST`
*   **Body**:
    ```json
    {
      "user_id": 123,
      "score": 5000
    }
    ```
*   **Response**: `201 Created`

### 2. Get Top Scores
*   **URL**: `/top`
*   **Method**: `GET`
*   **Response**: Returns top 10 users sorted by highest score.
    ```json
    [
      { "user": "mario_01", "total_score": 99999, "rank": 1 },
      { "user": "luigi_02", "total_score": 88888, "rank": 2 }
    ]
    ```

### 3. Get Player Rank
*   **URL**: `/rank/<user_id>`
*   **Method**: `GET`
*   **Response**:
    ```json
    {
      "user_id": 123,
      "total_score": 5000,
      "rank": 45
    }
    ```
