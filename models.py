from fuzzywuzzy import fuzz
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

#SKILLMATCHER
class SkillMatcher:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
    
    def calculate_user_similarity(self, user1_skills, user2_skills):
        """Calculate similarity between two users based on skills using Jaccard similarity"""
        intersection = set(user1_skills) & set(user2_skills)
        union = set(user1_skills) | set(user2_skills)
        if len(union) == 0:
            return 0
        return len(intersection) / len(union)
    
    def get_recommendations(self, user_id, all_users, top_n=10):
        """Get top N user recommendations based on skill compatibility"""
        recommendations = []
        target_user = next((u for u in all_users if u['id'] == user_id), None)
        
        if not target_user:
            return []
        
        for user in all_users:
            if user['id'] != user_id:
                # Calculate similarity between offered skills and wanted skills
                similarity = self.calculate_user_similarity(
                    target_user['skills_offered'], 
                    user['skills_wanted']
                )
                
                recommendations.append({
                    'user_id': user['id'],
                    'name': user['name'],
                    'similarity_score': similarity,
                    'skills': user['skills_offered'],
                    'location': user.get('location', 'Not specified')
                })
        
        return sorted(recommendations, key=lambda x: x['similarity_score'], reverse=True)[:top_n]
    
    def calculate_skill_demand(self, all_users):
        """Calculate which skills are most in demand"""
        skill_demand = {}
        for user in all_users:
            for skill in user.get('skills_wanted', []):
                skill_demand[skill] = skill_demand.get(skill, 0) + 1
        return sorted(skill_demand.items(), key=lambda x: x[1], reverse=True)

#INTELLIGENT SEARCH
class SmartSearch:
    def __init__(self):
        self.skill_categories = {
            'programming': ['Python', 'JavaScript', 'Java', 'C++', 'React', 'Node.js'],
            'design': ['UI/UX', 'Graphic Design', 'Adobe Photoshop', 'Figma'],
            'data': ['Data Science', 'Machine Learning', 'SQL', 'Excel', 'Tableau'],
            'marketing': ['Digital Marketing', 'SEO', 'Content Writing', 'Social Media']
        }
    
    def fuzzy_search(self, query, skills_list, threshold=70):
        """Implement fuzzy search for skills with typo correction"""
        matches = []
        for skill in skills_list:
            ratio = fuzz.ratio(query.lower(), skill.lower())
            if ratio > threshold:
                matches.append({
                    'skill': skill,
                    'confidence': ratio,
                    'category': self._get_skill_category(skill)
                })
        return sorted(matches, key=lambda x: x['confidence'], reverse=True)
    
    def get_suggestions(self, query, skills_list, limit=5):
        """Get auto-complete suggestions"""
        suggestions = []
        query_lower = query.lower()
        
        # Exact prefix matches first
        for skill in skills_list:
            if skill.lower().startswith(query_lower):
                suggestions.append({
                    'skill': skill,
                    'type': 'exact_match',
                    'category': self._get_skill_category(skill)
                })
        
        # Fuzzy matches if not enough exact matches
        if len(suggestions) < limit:
            fuzzy_matches = self.fuzzy_search(query, skills_list, threshold=60)
            for match in fuzzy_matches:
                if match['skill'] not in [s['skill'] for s in suggestions]:
                    suggestions.append({
                        'skill': match['skill'],
                        'type': 'fuzzy_match',
                        'category': match['category']
                    })
        
        return suggestions[:limit]
    
    def _get_skill_category(self, skill):
        """Categorize skills for better organization"""
        for category, skills in self.skill_categories.items():
            if skill in skills:
                return category
        return 'other'
    
    def search_users_by_skill(self, skill_query, all_users, threshold=70):
        """Search users who have specific skills"""
        matching_users = []
        
        for user in all_users:
            user_skills = user.get('skills_offered', []) + user.get('skills_wanted', [])
            
            for user_skill in user_skills:
                similarity = fuzz.ratio(skill_query.lower(), user_skill.lower())
                if similarity > threshold:
                    matching_users.append({
                        'user': user,
                        'matching_skill': user_skill,
                        'similarity': similarity
                    })
                    break
        
        return sorted(matching_users, key=lambda x: x['similarity'], reverse=True)

#SKILL RECCOMENDER
class LearningPathRecommender:
    def __init__(self):
        self.skill_progression = {
            'Python': ['Data Science', 'Machine Learning', 'Django', 'Flask'],
            'JavaScript': ['React', 'Node.js', 'Vue.js', 'Angular'],
            'HTML/CSS': ['JavaScript', 'React', 'UI/UX Design'],
            'SQL': ['Data Science', 'Database Administration', 'Data Analytics']
        }
        
        self.market_demand_skills = [
            'Python', 'JavaScript', 'React', 'Node.js', 'Machine Learning',
            'Data Science', 'UI/UX Design', 'Cloud Computing', 'DevOps'
        ]
    
    def analyze_skill_gaps(self, user_skills, market_skills=None):
        """Identify missing skills compared to market demand"""
        if market_skills is None:
            market_skills = self.market_demand_skills
        
        user_skill_set = set(user_skills)
        market_skill_set = set(market_skills)
        
        gaps = list(market_skill_set - user_skill_set)
        return gaps
    
    def recommend_learning_path(self, user_skills, target_skills=None):
        """Suggest learning path based on current skills"""
        recommendations = []
        
        for skill in user_skills:
            if skill in self.skill_progression:
                next_skills = self.skill_progression[skill]
                for next_skill in next_skills:
                    if next_skill not in user_skills:
                        recommendations.append({
                            'skill': next_skill,
                            'prerequisite': skill,
                            'difficulty': 'intermediate',
                            'reason': f'Natural progression from {skill}'
                        })
        
        # Add market demand recommendations
        gaps = self.analyze_skill_gaps(user_skills)
        for gap in gaps[:3]:  # Top 3 market gaps
            recommendations.append({
                'skill': gap,
                'prerequisite': 'None',
                'difficulty': 'beginner',
                'reason': 'High market demand'
            })
        
        return recommendations[:5]  # Return top 5 recommendations
    
    def predict_swap_success(self, user_profile, target_profile):
        """Predict likelihood of successful swap"""
        user_offered = set(user_profile.get('skills_offered', []))
        target_wanted = set(target_profile.get('skills_wanted', []))
        
        target_offered = set(target_profile.get('skills_offered', []))
        user_wanted = set(user_profile.get('skills_wanted', []))
        
        # Calculate mutual benefit
        user_gets = len(user_wanted & target_offered)
        target_gets = len(target_wanted & user_offered)
        
        total_possible = len(user_wanted | target_wanted)
        
        if total_possible == 0:
            return 0
        
        success_score = (user_gets + target_gets) / (2 * total_possible)
        
        return min(success_score, 1.0)  # Cap at 1.0
    
    def get_skill_difficulty(self, skill):
        """Estimate skill difficulty level"""
        difficulty_map = {
            'HTML/CSS': 'beginner',
            'JavaScript': 'intermediate',
            'Python': 'intermediate',
            'Machine Learning': 'advanced',
            'Data Science': 'advanced',
            'React': 'intermediate',
            'Node.js': 'intermediate'
        }
        return difficulty_map.get(skill, 'intermediate')
    
# Example: Multiple users getting recommendations simultaneously
users_database = [
    {'id': 1, 'name': 'Alice', 'skills_offered': ['Python'], 'skills_wanted': ['React']},
    {'id': 2, 'name': 'Bob', 'skills_offered': ['React'], 'skills_wanted': ['Python']},
    {'id': 3, 'name': 'Carol', 'skills_offered': ['Java'], 'skills_wanted': ['ML']},
    # ... hundreds more users
]

# All users can get recommendations from the same model instance
skill_matcher = SkillMatcher()

# User 1's recommendations
alice_recs = skill_matcher.get_recommendations(1, users_database)

# User 2's recommendations (independent of User 1)
bob_recs = skill_matcher.get_recommendations(2, users_database)

# User 3's recommendations (all processed efficiently)
carol_recs = skill_matcher.get_recommendations(3, users_database)

print(alice_recs)
