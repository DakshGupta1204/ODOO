# app.py
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from models import SkillMatcher, SmartSearch
import json

app = Flask(__name__)
CORS(app)

# Initialize ML models
skill_matcher = SkillMatcher()
smart_search = SmartSearch()

# Sample data (replace with database in production)
users_data = [
    {
        'id': 1,
        'name': 'John Doe',
        'skills_offered': ['Python', 'Machine Learning', 'Data Science'],
        'skills_wanted': ['React', 'Frontend Development'],
        'location': 'Mumbai'
    },
    {
        'id': 2,
        'name': 'Jane Smith',
        'skills_offered': ['React', 'JavaScript', 'Frontend Development'],
        'skills_wanted': ['Python', 'Backend Development'],
        'location': 'Delhi'
    }
]

skills_list = ['Python', 'JavaScript', 'React', 'Machine Learning', 'Data Science', 
               'Frontend Development', 'Backend Development', 'Node.js', 'Django']

@app.route('/')
def home():
    return jsonify({
        'message': 'Skill Swap Platform API',
        'status': 'running',
        'endpoints': ['/api/recommendations', '/api/search', '/api/suggestions']
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
