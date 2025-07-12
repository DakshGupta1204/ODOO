from flask import request, jsonify
from db_manager import DatabaseManager
from supabase_client import supabase

db_manager = DatabaseManager()

def init_routes(app):
    
    @app.route('/api/users', methods=['POST'])
    def create_user():
        """Create a new user"""
        try:
            data = request.get_json()
            
            # Create user in Supabase
            user_data = {
                'email': data['email'],
                'name': data['name'],
                'location': data.get('location', ''),
                'availability': data.get('availability', ''),
                'bio': data.get('bio', '')
            }
            
            user = db_manager.create_user(user_data)
            
            if user:
                # Add skills if provided
                for skill in data.get('skills_offered', []):
                    db_manager.add_user_skill(user['id'], skill, 'offered')
                
                for skill in data.get('skills_wanted', []):
                    db_manager.add_user_skill(user['id'], skill, 'wanted')
                
                return jsonify({'success': True, 'user': user})
            else:
                return jsonify({'success': False, 'error': 'Failed to create user'}), 400
                
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    @app.route('/api/recommendations/<user_id>', methods=['GET'])
    def get_recommendations(user_id):
        """Get ML-powered recommendations"""
        try:
            recommendations = db_manager.get_user_recommendations(user_id)
            return jsonify({
                'success': True,
                'recommendations': recommendations
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    @app.route('/api/search', methods=['POST'])
    def search_skills():
        """Smart skill search"""
        try:
            data = request.get_json()
            query = data.get('query', '')
            
            results = db_manager.search_skills(query)
            return jsonify({
                'success': True,
                'results': results
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    @app.route('/api/suggestions', methods=['GET'])
    def get_suggestions():
        """Get auto-complete suggestions"""
        try:
            query = request.args.get('q', '')
            suggestions = db_manager.get_skill_suggestions(query)
            
            return jsonify({
                'success': True,
                'suggestions': suggestions
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    @app.route('/api/swap-requests', methods=['POST'])
    def create_swap_request():
        """Create a new swap request"""
        try:
            data = request.get_json()
            
            swap_request = db_manager.create_swap_request(
                data['requester_id'],
                data['target_id'],
                data['requester_skill'],
                data['target_skill'],
                data.get('message', '')
            )
            
            if swap_request:
                return jsonify({'success': True, 'swap_request': swap_request})
            else:
                return jsonify({'success': False, 'error': 'Failed to create swap request'}), 400
                
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    @app.route('/api/users/<user_id>/swap-requests', methods=['GET'])
    def get_user_swap_requests(user_id):
        """Get user's swap requests"""
        try:
            swap_requests = db_manager.get_user_swap_requests(user_id)
            return jsonify({
                'success': True,
                'swap_requests': swap_requests
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    #Auth Integration
    @app.route('/api/auth/signup', methods=['POST'])
    def signup():
        """User signup with Supabase Auth"""
        try:
            data = request.get_json()
            
            # Sign up with Supabase Auth
            response = supabase.auth.sign_up({
                'email': data['email'],
                'password': data['password']
            })
            
            if response.user:
                # Create user profile
                user_profile = db_manager.create_user({
                    'email': data['email'],
                    'name': data['name']
                })
                
                return jsonify({
                    'success': True,
                    'user': response.user,
                    'profile': user_profile
                })
            else:
                return jsonify({'success': False, 'error': 'Signup failed'}), 400
                
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    @app.route('/api/auth/login', methods=['POST'])
    def login():
        """User login with Supabase Auth"""
        try:
            data = request.get_json()
            
            response = supabase.auth.sign_in_with_password({
                'email': data['email'],
                'password': data['password']
            })
            
            if response.user:
                return jsonify({
                    'success': True,
                    'user': response.user,
                    'session': response.session
                })
            else:
                return jsonify({'success': False, 'error': 'Login failed'}), 401
                
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    @app.route('/api/users', methods=['POST'])
    def create_user():
        data = request.get_json()
        # This now includes content moderation
        user = db_manager.moderate_and_create_user_profile(data)
        if user:
            return jsonify({'success': True, 'user': user})
        else:
            return jsonify({'success': False, 'error': 'Profile contains inappropriate content'}), 400
    
    # In your create_swap_request route, use the new prediction method
    @app.route('/api/swap-requests', methods=['POST'])
    def create_swap_request():
        data = request.get_json()
        # This now includes success prediction
        swap_request = db_manager.predict_and_create_swap_request(data)
        if swap_request:
            return jsonify({'success': True, 'swap_request': swap_request})
        else:
            return jsonify({'success': False, 'error': 'Failed to create swap request'}), 400
    @app.route('/api/messages/schedule/<user_id>', methods=['POST'])
    def schedule_message(user_id):
        """Schedules a personalized message for a user."""
        data = request.get_json()
        message_type = data.get('message_type', 'engagement')
        
        scheduled_message = db_manager.schedule_personalized_message(user_id, message_type)
        
        if scheduled_message:
            return jsonify({'success': True, 'message': scheduled_message})
        else:
            return jsonify({'success': False, 'error': 'Could not schedule message'}), 500
