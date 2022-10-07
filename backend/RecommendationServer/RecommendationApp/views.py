from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from RecommendationApp.tasks import recommend_cf_item_based
from RecommendationApp.tasks import recommend_cf_matrix_factorization
from RecommendationApp.tasks import recommend_cf_matrix_factorization_with_personalization
from RecommendationApp.tasks import recommend_by_SGD
from RecommendationApp.tasks import get_recipe_by_SGD
from RecommendationApp.tasks import get_recipe_by_nutrients
from RecommendationApp.tasks import get_recipe_by_refrigerator


@csrf_exempt
def recommend_cf_api(request):
    return JsonResponse('NONE', safe=False)
    # if request.method=='POST':
    #     user_id = JSONParser().parse(request)['id']
    #     print(user_id)
    #     return JsonResponse(recommend_by_SGD(user_id), safe=False)

@csrf_exempt
def get_recommend_api(request):
    if request.method=='POST':
        user_id = JSONParser().parse(request)['user_id']
        return JsonResponse(get_recipe_by_SGD(user_id), safe=False)

@csrf_exempt
def get_recommend_by_nutrients_api(request):
    if request.method=='POST':
        req = JSONParser().parse(request)
        user_id = req['user_id']
        period = req['period']
        return JsonResponse(get_recipe_by_nutrients(user_id, period), safe=False)

@csrf_exempt
def get_recommend_by_refrigerator_api(request):
    if request.method=='POST':
        req = JSONParser().parse(request)
        user_id = req['user_id']
        return JsonResponse(get_recipe_by_refrigerator(user_id), safe=False)