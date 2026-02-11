from .views import SubmitScoreView, TopScoresView, PlayerRankView

urlpatterns = [
    path('submit', SubmitScoreView.as_view(), name='submit-score'),
    path('top', TopScoresView.as_view(), name='top-scores'),
    path('rank/<int:user_id>', PlayerRankView.as_view(), name='player-rank'),
]
