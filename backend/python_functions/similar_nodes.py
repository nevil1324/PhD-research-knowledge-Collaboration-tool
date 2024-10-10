import pymongo
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import nltk
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('stopwords')

def preprocess_text(text):
    # Tokenize the text
    tokens = word_tokenize(text)
    # Remove stop words and perform stemming
    stop_words = set(stopwords.words('english'))
    porter = PorterStemmer()
    filtered_tokens = [porter.stem(token.lower()) for token in tokens if token.lower() not in stop_words]
    # Join the tokens back into a string
    processed_text = ' '.join(filtered_tokens)
    return processed_text

def similar_nodes(title_name):
    # Preprocess the input title
    processed_title1 = preprocess_text(title_name)

    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["SSD_Project"]  # Replace "SSD_Project" with your MongoDB database name
    collection = db["papers"]  # Replace "papers" with your collection name

    # Retrieve data from MongoDB as a cursor and create a DataFrame
    cursor = collection.find({}, {"id": 1, "title": 1, "authors": 1, "doi": 1})
    data = list(cursor)
    df = pd.DataFrame(data)

    # Preprocess titles in the DataFrame
    df['processed_title1'] = df['title'].apply(preprocess_text)

    # Vectorize the processed titles using TF-IDF
    tfidfvectorizer = TfidfVectorizer()
    tfidf_matrix = tfidfvectorizer.fit_transform(df['processed_title1'])

    # Calculate cosine similarity between input title and all titles in the database
    input_vector = tfidfvectorizer.transform([processed_title1])
    cosine_sim = cosine_similarity(input_vector, tfidf_matrix)

    # Get top 5 similar papers based on cosine similarity scores
    similar_papers1 = list(cosine_sim.argsort()[0][-1:-6:-1])
    recommended_titles_set1 = list(df.loc[similar_papers1, 'title'])
    recommended_authors_set1 = list(df.loc[similar_papers1, 'authors'])
    recommended_doi_set1 = list(df.loc[similar_papers1, 'doi'])
    print(recommended_doi_set1)
    recommended_ids_set1 = list(df.loc[similar_papers1, 'id'])
    
    processed_title2 = preprocess_text(recommended_titles_set1[0])
    # data = list(cursor)
    # df = pd.DataFrame(data)

    # Preprocess titles in the DataFrame
    df['processed_title2'] = df['title'].apply(preprocess_text)
    # Vectorize the processed titles using TF-IDF
    tfidfvectorizer = TfidfVectorizer()
    tfidf_matrix = tfidfvectorizer.fit_transform(df['processed_title2'])

    # # Calculate cosine similarity between input title and all titles in the database
    input_vector = tfidfvectorizer.transform([processed_title2])
    cosine_sim = cosine_similarity(input_vector, tfidf_matrix)

    # # Get top 5 similar papers based on cosine similarity scores
    similar_papers2 = list(cosine_sim.argsort()[0][-1:-7:-1])
    recommended_ids_set2 = list(df.loc[similar_papers2, 'id'])
    
    processed_title3 = preprocess_text(recommended_titles_set1[1])
    # data = list(cursor)
    # df = pd.DataFrame(data)

    # # Preprocess titles in the DataFrame
    df['processed_title3'] = df['title'].apply(preprocess_text)

    # # Vectorize the processed titles using TF-IDF
    tfidfvectorizer = TfidfVectorizer()
    tfidf_matrix = tfidfvectorizer.fit_transform(df['processed_title3'])

    # # Calculate cosine similarity between input title and all titles in the database
    input_vector = tfidfvectorizer.transform([processed_title3])
    cosine_sim = cosine_similarity(input_vector, tfidf_matrix)

    similar_papers3 = list(cosine_sim.argsort()[0][-1:-7:-1])
    recommended_ids_set3 = list(df.loc[similar_papers3, 'id'])

    
    ####################
    processed_title4 = preprocess_text(recommended_titles_set1[2])
    # data = list(cursor)
    # df = pd.DataFrame(data)

    # Preprocess titles in the DataFrame
    df['processed_title4'] = df['title'].apply(preprocess_text)
    # Vectorize the processed titles using TF-IDF
    tfidfvectorizer = TfidfVectorizer()
    tfidf_matrix = tfidfvectorizer.fit_transform(df['processed_title4'])

    # # Calculate cosine similarity between input title and all titles in the database
    input_vector = tfidfvectorizer.transform([processed_title4])
    cosine_sim = cosine_similarity(input_vector, tfidf_matrix)

    # # Get top 5 similar papers based on cosine similarity scores
    similar_papers4 = list(cosine_sim.argsort()[0][-1:-7:-1])
    recommended_ids_set4 = list(df.loc[similar_papers4, 'id'])
    
  

    # Get top 5 similar papers based on cosine similarity scores
    # Extract IDs of recommended papers
    recommended_ids = recommended_ids_set1 + recommended_ids_set2[1:] + recommended_ids_set3[1:] + recommended_ids_set4[1:]
    recommended_titles_set2 = list(df.loc[similar_papers2, 'title'])
    recommended_titles_set3 = list(df.loc[similar_papers3, 'title'])
    recommended_titles_set4 = list(df.loc[similar_papers4, 'title'])
    recommended_authors_set2 = list(df.loc[similar_papers2, 'authors'])
    recommended_authors_set3 = list(df.loc[similar_papers3, 'authors'])
    recommended_authors_set4 = list(df.loc[similar_papers4, 'authors'])
    recommended_doi_set2 = list(df.loc[similar_papers2, 'doi'])
    recommended_doi_set3 = list(df.loc[similar_papers3, 'doi'])
    recommended_doi_set4 = list(df.loc[similar_papers4, 'doi'])

    recommended_titles = recommended_titles_set1 + recommended_titles_set2[1:] + recommended_titles_set3[1:] + recommended_titles_set4[1:] 
    recommended_authors = recommended_authors_set1 + recommended_authors_set2[1: ] + recommended_authors_set3[1:] + recommended_authors_set4[1:]
    recommended_dois = recommended_doi_set1 + recommended_doi_set2[1:]  + recommended_doi_set3[1:] + recommended_doi_set4[1:]
    return recommended_ids +recommended_titles + recommended_authors + recommended_dois

# for t in recommendations('graph thorey mchine model '):
#     print(t)


# import pymongo
# import pandas as pd
# import numpy as np
# import nltk
# from nltk.tokenize import RegexpTokenizer
# from nltk.stem import PorterStemmer
# from nltk.corpus import stopwords
# from nltk.stem import WordNetLemmatizer
# from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.feature_extraction.text import TfidfVectorizer
# from gensim.models import Word2Vec
# from sklearn.neighbors import NearestNeighbors
# from sklearn.metrics.pairwise import linear_kernel, cosine_similarity

# # nltk.download('punkt')
# # nltk.download('wordnet')
# # nltk.download('stopwords')



# def recommendations(title_name):
#     client = pymongo.MongoClient("mongodb://localhost:27017/")
#     db = client["SSD_Project"]  # Replace "your_database_name" with your MongoDB database name
#     collection = db["papers"]  # Replace "papers" with your collection name

#     # Retrieve data from MongoDB as a cursor
#     cursor = collection.find({}, {"id": 1, "title": 1})
#     data = list(cursor)
#     # print(data)
#     # print(cursor)
#     # col_id = [doc['id'] for doc in data]
#     # print(data[0])

#     # Create a DataFrame from the retrieved data
#     df = pd.DataFrame(data)
#     new_data_frame= df[['id','title']]
    
#     tfidfvectorizer = TfidfVectorizer()
#     tfidfmatrix = tfidfvectorizer.fit_transform(new_data_frame['title'])
#     data_frame = pd.DataFrame(tfidfmatrix.toarray())
    
#     cosine_sim = cosine_similarity(data_frame)
    
#     # print(new_data_frame[new_data_frame['title'].str.contains(title, case=False)].index)
#     res = []
#     for title in title_name:
#         matching_idx = new_data_frame[new_data_frame['title'].str.contains(title, case=False)].index
#         if not matching_idx.empty:
#             idx = matching_idx[0]
#             score_series = pd.Series(cosine_sim[idx]).sort_values(ascending = False)
#             res.extend(score_series)
 
#     top_10_indexes = list(score_series.iloc[1:10].index)
    
#     recommended_id = []
#     for i in top_10_indexes:
#         recommended_id.append(list(new_data_frame['id'])[i])
        
#     return recommended_id 
# ans = similar_nodes("computer")
# for it in ans:  
#     print(it)
#     print()
# print(len(ans))
   
