from flask import Flask, request, jsonify
import json
from recommendations import recommendations
from similar_nodes import similar_nodes
app = Flask(__name__)

class PaperRecommendationEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, PaperRecommendation):
            return {
                "id": o.id,
                "title": o.title,
                "authors": o.authors,
                "doi": o.doi,
                "similar_recommendations": [
                    {
                        "id": rec.id,
                        "title": rec.title,
                        "authors": rec.authors,
                        "doi": rec.doi,
                        "similar_recommendations": rec.similar_recommendations
                    } for rec in o.similar_recommendations
                ]
            }
        return super().default(o)

class PaperRecommendation:
    def __init__(self, paper_id, title,authors,doi, similar_recommendations=None):
        self.id = paper_id
        self.title = title
        self.authors = authors
        self.doi = doi
        self.similar_recommendations = similar_recommendations if similar_recommendations else []

    def add_similar_recommendation(self, paper_recommendation):
        self.similar_recommendations.append(paper_recommendation)

    def __str__(self):
        return f"PaperRecommendation(id={self.id}, title='{self.title}', similar_recommendations={self.similar_recommendations})"

@app.route('/searching', methods=['POST'])
def get_recommendations():
    data = request.json
    recommended_ids = recommendations(data["searchText"])
    return jsonify(recommended_ids)

@app.route('/similar_nodes', methods=['POST'])
def get_nodes():
    data = request.json 
    arr = similar_nodes(data['nodes'])
    print(arr)
    paper1 = PaperRecommendation(arr[0], arr[0 + 20],arr[0 + 40] ,arr[0 + 60],[])
    paper2 = PaperRecommendation(arr[1], arr[1 + 20],arr[1 + 40] ,arr[1 + 60], [])
    paper3 = PaperRecommendation(arr[2], arr[2 + 20],arr[2 + 40] ,arr[2 + 60], [])
    paper4 = PaperRecommendation(arr[3], arr[3 + 20],arr[3 + 40] ,arr[3 + 60], [])
    paper5 = PaperRecommendation(arr[4], arr[4 + 20], arr[4 + 40] ,arr[4 + 60],[])

    for i in range(5, 10):
        paper1.add_similar_recommendation(PaperRecommendation(arr[i], arr[i + 20],arr[i + 40],arr[i + 60], []))
    for i in range(10, 15):
        paper2.add_similar_recommendation(PaperRecommendation(arr[i], arr[i + 20],arr[i + 40],arr[i + 60], []))
    for i in range(15, 20):
        paper3.add_similar_recommendation(PaperRecommendation(arr[i], arr[i + 20],arr[i + 40],arr[i + 60], []))
    ans = [paper1, paper2, paper3, paper4, paper5]

    # Use the custom JSON encoder
    json_response = json.dumps(ans, default=lambda x: x.__dict__, cls=PaperRecommendationEncoder)
    return json_response

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
