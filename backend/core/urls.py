from .views import SubmitScoreView

urlpatterns = [
    path('submit', SubmitScoreView.as_view(), name='submit-score'),
]
