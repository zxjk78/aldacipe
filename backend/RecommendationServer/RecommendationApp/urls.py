from django.conf.urls import url
from RecommendationApp import views

urlpatterns=[
    url(r'^recommend_cf$', views.recommend_cf_api),
    url(r'^recommend_cf/([0-9]+)$', views.recommend_cf_api),
    url(r'^recommend_sgd$', views.get_recommend_api),
    url(r'^recommend_sgd/([0-9]+)$', views.get_recommend_api),
    url(r'^recommend_nutrients$', views.get_recommend_by_nutrients_api),
    url(r'^recommend_nutrients/([0-9]+)$', views.get_recommend_by_nutrients_api),
    url(r'^recommend_refrigerator$', views.get_recommend_by_refrigerator_api),
    url(r'^recommend_refrigerator/([0-9]+)$', views.get_recommend_by_refrigerator_api),
]