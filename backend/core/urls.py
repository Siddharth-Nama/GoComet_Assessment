from .views import SubmitScoreView, TopScoresView

urlpatterns = [
    path('submit', SubmitScoreView.as_view(), name='submit-score'),
    path('top', TopScoresView.as_view(), name='top-scores'),
]
