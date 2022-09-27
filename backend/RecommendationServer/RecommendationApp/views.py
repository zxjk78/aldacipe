from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from RecommendationApp.tasks import recommend_cf_item_based
from RecommendationApp.tasks import recommend_cf_matrix_factorization
from RecommendationApp.tasks import recommend_cf_matrix_factorization_with_personalization

@csrf_exempt
def recommend_cf_api(request):
    if request.method=='POST':
        user_id = JSONParser().parse(request)['id']
        return JsonResponse(recommend_cf_matrix_factorization_with_personalization(user_id), safe=False)