import pymysql
import pandas as pd
import numpy as np
import redis
import json
import time

from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import mean_squared_error
from sklearn.decomposition import TruncatedSVD
from scipy.sparse.linalg import svds
from datetime import datetime, timedelta

local_mysql_address = "172.18.0.1"
deploy_mysql_address = "172.26.14.189"

def get_user_eval():
    # local
    #conn = pymysql.connect(host="172.18.0.1", user="a501", password="local_aldacipe", db="aldacipe")
    
    # deploy
    conn = pymysql.connect(host="172.26.14.189", user="a501", password="deploy_aldacipe", db="aldacipe")

    curs = conn.cursor()
    query = "SELECT score, recipe_id, user_id FROM evaluation"
    curs.execute(query)
    columns = ['score', 'recipe_id', 'user_id'] 
    return pd.DataFrame(list(curs.fetchall()), columns = columns)

def get_recipe():
    # local
    #conn = pymysql.connect(host="172.18.0.1", user="a501", password="local_aldacipe", db="aldacipe")
    
    # deploy
    conn = pymysql.connect(host="172.26.14.189", user="a501", password="deploy_aldacipe", db="aldacipe")

    curs = conn.cursor()
    query = "SELECT id, name, weight FROM recipe"
    curs.execute(query)
    columns = ['id', 'name', 'weight'] 
    return pd.DataFrame(list(curs.fetchall()), columns = columns)


def recommend_cf_item_based(user_id):
    user_eval = get_user_eval()

    preprocessedData = user_eval.groupby('user_id').filter(lambda x : len(x) > 5)
    preprocessedData = preprocessedData.groupby('recipe_id').filter(lambda x : len(x) > 5)    
    
    rating_matrix = preprocessedData.pivot_table('score', index='recipe_id', columns='user_id')
    rating_matrix = rating_matrix.fillna(0)
    
    item_based = cosine_similarity(rating_matrix)
    item_based = pd.DataFrame(data=item_based, index=rating_matrix.index, columns=rating_matrix.index)

    print(item_based)

    item_based[id].sort_values(ascending=False)[1:6]

    return "Test..."

def recommend_cf_matrix_factorization(user_id):
    user_eval = get_user_eval()
    # preprocessedData = user_eval.groupby('user_id').filter(lambda x : len(x) > 5)
    # preprocessedData = preprocessedData.groupby('recipe_id').filter(lambda x : len(x) > 5)    
    
    user_recipe_matrix = user_eval.pivot_table('score', index='user_id', columns='recipe_id').fillna(0)
    recipe_user_matrix = user_recipe_matrix.values.T

    SVD = TruncatedSVD(n_components=12)
    matrix = SVD.fit_transform(recipe_user_matrix)
    corr = np.corrcoef(matrix)

    recipe_list = list(user_recipe_matrix.columns)
    coffey_hands = recipe_list.index(1831127)
    corr_coffey_hands = corr[coffey_hands]
    print(list(user_recipe_matrix.columns[(corr_coffey_hands >= 0.9)])[:20])

def recommend_recipes(df_svd_preds, user_id, user_index, org_recipe_df, org_rating_df, num=5):
    result = []
    user_row_number = user_index
    sorted_user_predictions = df_svd_preds.iloc[user_row_number].sort_values(ascending=False)
    user_data = org_rating_df[org_rating_df.user_id == user_id]
    used_recipe = list(user_data['recipe_id'])
    # for recipe in sorted_user_predictions.index:
    #     if recipe not in used_recipe:
    #         result.append(recipe)
    #         if len(result) == 20:
    #             break
    for recipe in sorted_user_predictions.index:
        result.append(recipe)
        if len(result) == 20:
            break
    return result


def recommend_cf_matrix_factorization_with_personalization(user_id):
    user_eval = get_user_eval()
    recipe_data = get_recipe()

    rating_matrix = user_eval.pivot_table('score', index='user_id', columns='recipe_id').fillna(0)

    user_index = 0
    for matrix_index in rating_matrix.index:
        if user_id == matrix_index:
            break
        user_index += 1
    if user_index == len(rating_matrix.index):
        return None

    matrix = rating_matrix.to_numpy()
    user_rating_mean = np.mean(matrix, axis=1)
    matrix_user_mean = matrix - user_rating_mean.reshape(-1, 1)

    #print("START")

    U, sigma, Vt = svds(matrix_user_mean, k=12)

    #print(sigma)
    #print(Vt)

    #print("DONE")
    sigma = np.diag(sigma)


    svd_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + user_rating_mean.reshape(-1, 1)
    df_svd_preds = pd.DataFrame(svd_user_predicted_ratings, columns = rating_matrix.columns)
    result = recommend_recipes(df_svd_preds, user_id, user_index, recipe_data, user_eval, 10)
    return result

def get_rmse(R, P, Q, non_zeros):
    error = 0
    full_pred_matrix = np.dot(P, Q.T)
    
    x_non_zero_ind = [non_zero[0] for non_zero in non_zeros]
    y_non_zero_ind = [non_zero[1] for non_zero in non_zeros]
    R_non_zeros = R[x_non_zero_ind, y_non_zero_ind]
    
    full_pred_matrix_non_zeros = full_pred_matrix[x_non_zero_ind, y_non_zero_ind]
      
    mse = mean_squared_error(R_non_zeros, full_pred_matrix_non_zeros)
    rmse = np.sqrt(mse)
    
    return rmse

def matrix_factorization(R, K, steps=160, learning_rate=0.01, r_lambda = 0.1):
    num_users, num_items = R.shape
    np.random.seed(1)
    P = np.random.normal(scale=1./K, size=(num_users, K))
    Q = np.random.normal(scale=1./K, size=(num_items, K))

    break_count = 0
       
    non_zeros = [ (i, j, R[i,j]) for i in range(num_users) for j in range(num_items) if R[i,j] > 0 ]
    for step in range(steps):
        index = 0
        for i, j, r in non_zeros:
            index += 1
            eij = r - np.dot(P[i, :], Q[j, :].T)
            P[i,:] = P[i,:] + learning_rate*(eij * Q[j, :] - r_lambda*P[i,:])
            Q[j,:] = Q[j,:] + learning_rate*(eij * P[i, :] - r_lambda*Q[j,:])
        rmse = get_rmse(R, P, Q, non_zeros)
        if (step % 10) == 0:
            print("### iteration step : ", step," rmse : ", rmse)
    return P, Q

def calculate_SGD():
    user_data = get_user_eval()
    recipe_data = get_recipe()[['id','name']]
    if len(user_data) == 0 or len(recipe_data) == 0:
        return
    recipe_data.columns = ['recipe_id', 'name']
    rating_recipe = pd.merge(user_data, recipe_data, on='recipe_id')
    rating_matrix = rating_recipe.pivot_table('score', index='user_id', columns='recipe_id')
    rating_matrix = rating_matrix.fillna(0)
    print(rating_matrix.head(3))
    P, Q = matrix_factorization(rating_matrix.values, K=50, steps=160, learning_rate=0.01, r_lambda = 0.1)
    pred_matrix = np.dot(P, Q.T)
    
    rating_pred_matrix = pd.DataFrame(data=pred_matrix, index= rating_matrix.index, columns = rating_matrix.columns)
    print(rating_pred_matrix.head(3))
    return rating_pred_matrix

def recommend_by_SGD(top_n=20):
    prefix = 'rcmd_'
    #con = redis.StrictRedis(host="172.17.0.1", port=6379, charset="utf-8", decode_responses=True)
    con = redis.StrictRedis(host="172.17.0.3", port=6379, charset="utf-8", decode_responses=True)
    
    matrix = calculate_SGD()
    if len(matrix) == 0:
        return

    for index in matrix.index:
        recom_recipes = matrix.loc[index].sort_values(ascending=False)[:20]
        res_list = list(recom_recipes.index)
        con.set(prefix + str(index), json.dumps(res_list))

    now = time.localtime()
    print(now)
    return 'Done'

def get_recipe_by_SGD(user_id):
    prefix = 'rcmd_'
    #con = redis.StrictRedis(host="172.17.0.1", port=6379, charset="utf-8", decode_responses=True)
    con = redis.StrictRedis(host="172.17.0.3", port=6379, charset="utf-8", decode_responses=True)

    res = con.get(prefix + str(user_id))
    if res == None:
        return []
    
    recom_recipes = json.loads(res)
    return recom_recipes

# 2022-10-03
# http://172.17.0.1:8000/
def get_recipe_by_nutrients(user_id, period):
    user_id = int(user_id)
    period = int(period)
    nut_list = ['kcal','protein','fat','sugar','dietary_fiber','calcium','iron','magnesium','phosphorus','potassium','sodium','zinc','copper','selenium','molybdenum','iodine','vitamin_D','vitamin_E','vitamin_K','niacin','pantothenic_acid','vitamin_B6','biotin','folic_acid','vitamin_B12','vitamin_C']
    now = datetime.now()
    start_time = now - timedelta(days=period-1)
    from_date = str(start_time).split(" ")[0]
    print("FROMDATE = ",from_date)

    #conn = pymysql.connect(host="172.18.0.1", user="a501", password="local_aldacipe", db="aldacipe")
    conn = pymysql.connect(host="172.26.14.189", user="a501", password="deploy_aldacipe", db="aldacipe")
    curs = conn.cursor()

    user_nut_total = dict([])
    for nut in nut_list:
	    user_nut_total[nut] = 0

    # 음식 영양소 합계
    query = "SELECT f_n.* FROM user_intake ui INNER JOIN (SELECT f.id as food_id "
    for nut in nut_list:
	    query += ", n."+nut
    query += " FROM food f INNER JOIN nutrient n WHERE f.nutrient_id=n.id) f_n "
    query += " WHERE ui.food_id=f_n.food_id and ui.intake_type='FOOD' and ui.user_id="+str(user_id)+" and ui.intake_date>="+from_date+";"
    curs.execute(query)

    a = list(curs.fetchall())

    for row in a :
	    food_id = row[0]
	    for i in range(0,len(nut_list)):
	    	user_nut_total[nut_list[i]]+=float(row[i+1])

    # 레시피 영양소 합계
    query = "SELECT r_n.* FROM user_intake ui INNER JOIN (SELECT r.id as recipe_id "
    for nut in nut_list:
	    query += ", n."+nut
    query += " FROM recipe r INNER JOIN nutrient n WHERE r.nutrient_id=n.id) r_n "
    query += " WHERE ui.recipe_id=r_n.recipe_id and ui.intake_type='RECIPE' and ui.user_id="+str(user_id)+" and ui.intake_date>="+from_date+";"
    curs.execute(query)

    a = list(curs.fetchall())

    for row in a :
	    food_id = row[0]
	    for i in range(0,len(nut_list)):
		    user_nut_total[nut_list[i]]+=float(row[i+1])


# 사용자 일주일간 영양소 합계 확인
# print(user_nut_total)



########################################################
##### step 2 : 일주일 영양소 권장섭취량 정보를 불러온다. 
########################################################
# 사용자 성별과 생일 정보를 가져온다.
    query = "SELECT u.gender as gender, u.birthday as birthday FROM user u WHERE u.id="+str(user_id)+";"
    curs.execute(query)

    user_res = curs.fetchall()
    gender = user_res[0][0]
    birthday = str(user_res[0][1]).split("-")
    b_year = int(birthday[0])
    b_month = int(birthday[1])
    b_date = int(birthday[2])


    now_date = ((str(now)).split(" ")[0]).split("-")
    year = int(now_date[0])
    month = int(now_date[1])
    date = int(now_date[2])

    age = year-b_year
    if month < b_month : age-=1
    elif month==b_month and date < b_date : age-=1


# 성별과 나이에 맞는 일일 권장 섭취량 정보를 가져와 7을 곱해준다.

### 일주일 권장 섭취량
    query = "SELECT n.id"
    for nut in nut_list:
	    query += ", n."+nut
    query += " FROM recommended_intake ri INNER JOIN nutrient n "
    query += " WHERE n.id=ri.nutrient_id and ri.type='RECOMMENDED' and ri.gender='"+gender+"' and ri.min_age<="+str(age)+" and ri.max_age>="+str(age)
    curs.execute(query)

    rn_res = curs.fetchall()
    recommend_nut = dict([])

    for i in range(0,len(nut_list)):
	    recommend_nut[nut_list[i]]=float(rn_res[0][i+1])*period


# print("권장 섭취량 : ",recommend_nut)

### 일주일 상한 섭취량
    query = "SELECT n.id"
    for nut in nut_list:
	    query += ", n."+nut
    query += " FROM recommended_intake ri INNER JOIN nutrient n "
    query += " WHERE n.id=ri.nutrient_id and ri.type='LIMIT' and ri.gender='"+gender+"' and ri.min_age<="+str(age)+" and ri.max_age>="+str(age)
    curs.execute(query)

    rn_res = curs.fetchall()
    limit_nut = dict([])

    for i in range(0,len(nut_list)):
	    limit_nut[nut_list[i]]=float(rn_res[0][i+1])*period

# print("상한 섭취량 : ",limit_nut)

########################################################
##### step 3 : 사용자의 영양소 합계와 권장섭취량을 비교해 부족하거나 과도한 영양분에 따라
#####           요구되는 레시피 특성 리스트를 제작 (가상의 레시피)
########################################################

    required_feature_id_list = []

    for i in range(0,len(nut_list)):
	    current_nut = nut_list[i]
	    user_intake = user_nut_total[current_nut]
	    recommended = recommend_nut[current_nut]
	    limit = limit_nut[current_nut]

	    feature_id = i+1
	### 칼로리, 지방, 당분 상한 섭취량 임의 정의 (130%)
	    if feature_id in [1,3,4]:
		    limit = recommended*1.3
	    print(current_nut +" -> "+ str(recommended)+" | "+str(user_intake)+ " | "+str(limit))

	    if feature_id in [1,3,4,11] :
		    if user_intake > limit :
			    print(" -> OVER")
			    required_feature_id_list.append(feature_id)
	    else :
		    if user_intake < recommended :
			    print(" -> LACK")
			    required_feature_id_list.append(feature_id)

    print(required_feature_id_list)

########################################################
##### step 4 : 사용자가 먹어야 하는 가상의 레피시와 가장 특성이 비슷한 레시피를 20개 조회하여 반환
########################################################
# 특성 개수
    query = "SELECT count(*) FROM nutrient_feature nf"
    curs.execute(query)

    nf_res = curs.fetchall()
    feature_num = int(nf_res[0][0])
    print(feature_num)

# 사용자 가상 레시피 특성 벡터
    user_required_vector = [0 for i in range(feature_num)]
    for fid in required_feature_id_list:
	    user_required_vector[fid-1] = 1

# 전체 레시피 특성 불러오기
    query = "SELECT rf.recipe_id, rf.nutrient_feature_id FROM recipe_feature rf"
    curs.execute(query)

    a = list(curs.fetchall())

    recipe_features = dict([])

    for row in a :
	# print(row)
	    recipe_id = row[0]
	    f_id = row[1]
	# print(recipe_id,", ",f_id)
	    if recipe_id not in recipe_features :
		    recipe_features[recipe_id] = []
	    recipe_features[recipe_id].append(f_id)

# 특성 벡터를 생성 & 코사인 유사도 점수를 담는다. (recipe_id, score) -> 정렬하여 20개 반환
    from numpy import dot
    from numpy.linalg import norm
    import numpy as np

# 코사인 유사도 함수 
    def cos_sim(A, B):
        return dot(A, B)/(norm(A)*norm(B))

    sim_score_list = []

# 레시피 별 특성 유사도 점수 저장
    for key in recipe_features:
	    # print(key,": ",recipe_features[key])
	    feature_vector = [0 for i in range(feature_num)]
	    for f_id in recipe_features[key]:
		    feature_vector[int(f_id)-1]=1
	
	    cos_sim_score = cos_sim(user_required_vector, feature_vector)
	    sim_score_list.append([key,cos_sim_score])

# 정렬 (유사도 점수 내림차순)
    sim_score_list.sort(key=lambda s:-s[1])

    result_with_score = sim_score_list[0:20]
    result = []
    for rs in result_with_score:
	    result.append(rs[0])

    print(" RESULT :",result)
    return result

## 1003
# %%
def set_my_ing(user_id,cur):
    res = dict()
    res["recipe_id"] = [-1]
    ing_set = []
    sql_get_ref_ing = "select name from ingredient where id in (select ingredient_id from refrigerator_ingredient  where user_id = {})".format(user_id)
    cur.execute(sql_get_ref_ing)
    res_query = cur.fetchall()
    tmp = []
    for tp in res_query:
        ing = tp[0]
        if len(ing) == 1:
            ing = ing + "궯"
        tmp.append(ing)
    if len(tmp) == 0:
        tmp = ['']
    res["recipe_ing"] = [' '.join(tmp)]
    print(res)
    return res

def get_rm_cv(df, recipe,top = 20):
    count_vector = CountVectorizer(ngram_range=(1,1))
    c_vector_ingre = count_vector.fit_transform(df["recipe_ing"])
    ingre_c_sim = cosine_similarity(c_vector_ingre, c_vector_ingre).argsort()[:,::-1]
    target_recipe_index = df[df['recipe_id'] == recipe].index.values
    sim_index = ingre_c_sim[target_recipe_index, :top].reshape(-1)
    sim_index = sim_index[sim_index != target_recipe_index]
    result = df.iloc[sim_index]
    return result

def get_rm_tf(df, recipe,top = 20):
    tfidf_vector = TfidfVectorizer()
    t_vector_ingre = tfidf_vector.fit_transform(df["recipe_ing"])
    t_ingre_c_sim = cosine_similarity(t_vector_ingre, t_vector_ingre).argsort()[:,::-1]
    target_recipe_index = df[df['recipe_id'] == recipe].index.values
    t_sim_index = t_ingre_c_sim[target_recipe_index, :top].reshape(-1)
    t_sim_index = t_sim_index[t_sim_index != target_recipe_index]
    result = df.iloc[t_sim_index]
    return result

def cbf(user_id):
    conn = pymysql.connect(host="172.26.14.189", user="a501", password="deploy_aldacipe", db="aldacipe")
    cur = conn.cursor()
    sql_get_lst ="select ri.recipe_id, i.id, i.name from recipe_ingredient ri inner join ingredient i where ri.ingredient_id = i.id;"
    cur.execute(sql_get_lst)
    res_get_lst = cur.fetchall()
    dict_rec_ing = {}
    for x in res_get_lst:
        key,ing = x[0],x[2]
        ing = ing.replace(" ","")
        if len(ing) == 1:
            ing = ing + "궯"
        if dict_rec_ing.get(key) == None:
            dict_rec_ing[key] = list()
        dict_rec_ing[key].append(ing)
    recipe_id = [x[0] for x in dict_rec_ing.items()]
    recipe_ing = [' '.join(set(tp[1])) for tp in dict_rec_ing.items()]

    dic = {}
    dic["recipe_id"] =recipe_id
    dic["recipe_ing"] = recipe_ing
    df = pd.DataFrame(dic)
    my_data = set_my_ing(user_id,cur)
    new_df = pd.DataFrame(my_data)
    df = pd.concat([df, new_df], ignore_index=True)
    recom_res = get_rm_cv(df, -1)
    return recom_res
#    conn = pymysql.connect(host="172.26.14.189", user="a501", password="deploy_aldacipe", db="aldacipe")

def get_recipe_by_refrigerator(user_id):
    df = cbf(int(user_id))
    print(df)
    df_recipe_id = df['recipe_id']
    df_val = df_recipe_id.values
    res = list(map(int, df_val.tolist()))
    return res