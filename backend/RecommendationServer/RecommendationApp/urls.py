from django.conf.urls import url
from RecommendationApp import views

urlpatterns=[
    url(r'^recommend_cf$', views.recommend_cf_api),
    url(r'^recommend_cf/([0-9]+)$', views.recommend_cf_api),
]