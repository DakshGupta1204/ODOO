# routes.py
from flask import request, jsonify
from models import SkillMatcher, SmartSearch

def init_routes(app, skill_matcher, smart_search, users_data, skills_list):
    
    @app.route('/api/recommendations/<int:user_id>', methods=['GET'])
    def get_recommendations(user_id):
        """Get ML-powered user recommendations"""
        try:
            recommendations = skill_matcher.get_recommendations(user_id, users_data)
            return jsonify({
                'success': True,
                'user_id': user_id,
                'recommendations': recommendations
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    @app.route('/api/search', methods=['POST'])
    def smart_skill_search():
        """Smart search with fuzzy matching"""
        try:
            data = request.get_json()
            query = data.get('query', '')
            
            if not query:
                return jsonify({'success': False, 'error': 'Query is required'}), 400
            
            results = smart_search.fuzzy_search(query, skills_list)
            return jsonify({
                'success': True,
                'query': query,
                'results': results
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    @app.route('/api/suggestions', methods=['GET'])
    def get_suggestions():
        """Get auto-complete suggestions"""
        try:
            query = request.args.get('q', '')
            suggestions = smart_search.get_suggestions(query, skills_list)
            
            return jsonify({
                'success': True,
                'query': query,
                'suggestions': suggestions
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    @app.route('/api/users', methods=['GET'])
    def get_all_users():
        """Get all users"""
        return jsonify({
            'success': True,
            'users': users_data
        })
    
    @app.route('/api/users/<int:user_id>', methods=['GET'])
    def get_user(user_id):
        """Get specific user"""
        user = next((u for u in users_data if u['id'] == user_id), None)
        if user:
            return jsonify({'success': True, 'user': user})
        return jsonify({'success': False, 'error': 'User not found'}), 404
