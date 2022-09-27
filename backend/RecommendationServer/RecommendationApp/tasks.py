import pymysql
import pandas as pd
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics import mean_squared_error
from sklearn.decomposition import TruncatedSVD

from scipy.sparse.linalg import svds

def get_user_eval():
    # local
    #conn = pymysql.connect(host="localhost", user="a501", password="local_aldacipe", db="aldacipe")
    
    # deploy
    conn = pymysql.connect(host="172.18.0.1", port=3306, user="a501", password="local_aldacipe", db="aldacipe")

    curs = conn.cursor()
    query = "SELECT score, recipe_id, user_id FROM evaluation"
    curs.execute(query)
    columns = ['score', 'recipe_id', 'user_id'] 
    return pd.DataFrame(list(curs.fetchall()), columns = columns)

def get_recipe():
    # local
    #conn = pymysql.connect(host="localhost", user="a501", password="local_aldacipe", db="aldacipe")
    
    # deploy
    conn = pymysql.connect(host="172.18.0.1", port=3306, user="a501", password="local_aldacipe", db="aldacipe")

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
    for recipe in sorted_user_predictions.index:
        if recipe not in used_recipe:
            result.append(recipe)
            if len(result) == 5:
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