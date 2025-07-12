from supabase_client import supabase
from models import SkillMatcher, SmartSearch, LearningPathRecommender
from content_moderator import ContentModerator
from swap_monitor import SwapMonitor
from smart_messaging import SmartMessagingSystem

class DatabaseManager:
    def __init__(self):
        self.skill_matcher = SkillMatcher()
        self.smart_search = SmartSearch()
        self.learning_recommender = LearningPathRecommender()
    
    def get_all_users_with_skills(self):
        """Fetch all users with their skills from Supabase"""
        try:
            # Get users with their skills
            response = supabase.table('users').select('''
                id, name, location, availability, rating,
                user_skills(
                    skill_type,
                    skills(name, category)
                )
            ''').execute()
            
            users = []
            for user_data in response.data:
                skills_offered = []
                skills_wanted = []
                
                for user_skill in user_data.get('user_skills', []):
                    skill_name = user_skill['skills']['name']
                    if user_skill['skill_type'] == 'offered':
                        skills_offered.append(skill_name)
                    else:
                        skills_wanted.append(skill_name)
                
                users.append({
                    'id': user_data['id'],
                    'name': user_data['name'],
                    'location': user_data.get('location', ''),
                    'availability': user_data.get('availability', ''),
                    'rating': user_data.get('rating', 0.0),
                    'skills_offered': skills_offered,
                    'skills_wanted': skills_wanted
                })
            
            return users
        except Exception as e:
            print(f"Error fetching users: {e}")
            return []
    
    def get_user_recommendations(self, user_id, top_n=5):
        """Get ML-powered recommendations for a user"""
        all_users = self.get_all_users_with_skills()
        return self.skill_matcher.get_recommendations(user_id, all_users, top_n)
    
    def search_skills(self, query, threshold=70):
        """Search skills using fuzzy matching"""
        try:
            # Get all skills from database
            response = supabase.table('skills').select('name, category').execute()
            skills_list = [skill['name'] for skill in response.data]
            
            return self.smart_search.fuzzy_search(query, skills_list, threshold)
        except Exception as e:
            print(f"Error searching skills: {e}")
            return []
    
    def get_skill_suggestions(self, query, limit=5):
        """Get auto-complete suggestions"""
        try:
            response = supabase.table('skills').select('name, category').execute()
            skills_list = [skill['name'] for skill in response.data]
            
            return self.smart_search.get_suggestions(query, skills_list, limit)
        except Exception as e:
            print(f"Error getting suggestions: {e}")
            return []
    
    def create_user(self, user_data):
        """Create a new user"""
        try:
            response = supabase.table('users').insert(user_data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error creating user: {e}")
            return None
    
    def add_user_skill(self, user_id, skill_name, skill_type, proficiency_level=3):
        """Add a skill to user's profile"""
        try:
            # First, ensure skill exists
            skill_response = supabase.table('skills').select('id').eq('name', skill_name).execute()
            
            if not skill_response.data:
                # Create skill if it doesn't exist
                new_skill = supabase.table('skills').insert({
                    'name': skill_name,
                    'category': 'other',
                    'difficulty_level': 'intermediate'
                }).execute()
                skill_id = new_skill.data[0]['id']
            else:
                skill_id = skill_response.data[0]['id']
            
            # Add user skill
            response = supabase.table('user_skills').insert({
                'user_id': user_id,
                'skill_id': skill_id,
                'skill_type': skill_type,
                'proficiency_level': proficiency_level
            }).execute()
            
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error adding user skill: {e}")
            return None
    
    def create_swap_request(self, requester_id, target_id, requester_skill, target_skill, message=""):
        """Create a new swap request"""
        try:
            # Get skill IDs
            req_skill_response = supabase.table('skills').select('id').eq('name', requester_skill).execute()
            target_skill_response = supabase.table('skills').select('id').eq('name', target_skill).execute()
            
            if not req_skill_response.data or not target_skill_response.data:
                return None
            
            response = supabase.table('swap_requests').insert({
                'requester_id': requester_id,
                'target_id': target_id,
                'requester_skill_id': req_skill_response.data[0]['id'],
                'target_skill_id': target_skill_response.data[0]['id'],
                'message': message,
                'status': 'pending'
            }).execute()
            
            return response.data[0] if response.data else None
        except Exception as e:
            print(f"Error creating swap request: {e}")
            return None
    
    def get_user_swap_requests(self, user_id):
        """Get all swap requests for a user"""
        try:
            response = supabase.table('swap_requests').select('''
                id, status, message, created_at,
                requester:users!requester_id(name, email),
                target:users!target_id(name, email),
                requester_skill:skills!requester_skill_id(name),
                target_skill:skills!target_skill_id(name)
            ''').or_(f'requester_id.eq.{user_id},target_id.eq.{user_id}').execute()
            
            return response.data
        except Exception as e:
            print(f"Error fetching swap requests: {e}")
            return []
    # In database_manager.py
    def setup_realtime_subscriptions(self):
        """Setup real-time subscriptions for swap requests"""
        def handle_swap_update(payload):
            print(f"Swap request updated: {payload}")
            # Handle real-time updates here
        
        # Subscribe to swap_requests table changes
        supabase.table('swap_requests').on('*', handle_swap_update).subscribe()
    def moderate_and_create_user_profile(self, user_data):
        """Checks user bio for violations before creating a profile."""
        bio = user_data.get('bio', '')
        moderation_result = self.content_moderator.check_content(bio)
        
        if moderation_result['is_spam'] or moderation_result['policy_violations']:
            # Log the violation and reject the profile
            supabase.table('content_moderation').insert({
                'user_id': user_data.get('id'),
                'content_type': 'profile_bio',
                'content_text': bio,
                'is_spam': moderation_result['is_spam'],
                'policy_violations': moderation_result['policy_violations'],
                'status': 'rejected'
            }).execute()
            return None # Indicate failure
        
        # If content is clean, proceed to create the user
        return self.create_user(user_data)

    def predict_and_create_swap_request(self, swap_data):
        """Predicts success probability before creating a swap request."""
        # In a real app, you would fetch user ratings and history here
        mock_swap_data = {
            **swap_data,
            'requester_rating': 4.5,
            'target_rating': 4.2,
            'requester_swaps': 10
        }
        
        success_prob = self.swap_monitor.predict_swap_success(mock_swap_data)
        swap_data['success_probability'] = success_prob
        
        # Create the swap request with the prediction
        return self.create_swap_request(**swap_data)
    
    def schedule_personalized_message(self, user_id, message_type='engagement'):
        """Generates and schedules an AI-powered message for a user."""
        user_profile = self.get_user_by_id(user_id) # Assume get_user_by_id exists
        
        if not user_profile:
            return None
    
        message = self.smart_messaging.generate_personalized_message(user_profile, message_type)
        
        # Save the generated message to the database
        response = supabase.table('platform_messages').insert({
            'user_id': user_id,
            'message_content': message,
            'message_type': message_type,
            'status': 'scheduled'
        }).execute()
        
        return response.data[0] if response.data else None
