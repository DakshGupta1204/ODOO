# test_models.py
from models import SkillMatcher, SmartSearch, LearningPathRecommender

def test_skill_matcher():
    """Test the SkillMatcher model"""
    print("Testing SkillMatcher...")
    
    # Sample data
    users = [
        {'id': 1, 'name': 'Alice', 'skills_offered': ['Python', 'ML'], 'skills_wanted': ['React']},
        {'id': 2, 'name': 'Bob', 'skills_offered': ['React', 'JS'], 'skills_wanted': ['Python']},
        {'id': 3, 'name': 'Carol', 'skills_offered': ['Java'], 'skills_wanted': ['ML']}
    ]
    
    matcher = SkillMatcher()
    recommendations = matcher.get_recommendations(1, users)
    
    print(f" Recommendations for Alice: {len(recommendations)} users found")
    for rec in recommendations:
        print(f"   - {rec['name']}: {rec['similarity_score']:.2f} similarity")
    
    return len(recommendations) > 0

def test_smart_search():
    """Test the SmartSearch model"""
    print("\nTesting SmartSearch...")
    
    skills_list = ['Python', 'JavaScript', 'React', 'Machine Learning', 'Data Science']
    search = SmartSearch()
    
    # Test fuzzy search
    results = search.fuzzy_search('pytho', skills_list)  # Typo test
    print(f" Fuzzy search results: {len(results)} matches")
    
    # Test suggestions
    suggestions = search.get_suggestions('py', skills_list)
    print(f" Auto-complete suggestions: {suggestions}")
    
    return len(results) > 0

def test_learning_recommender():
    """Test the LearningPathRecommender model"""
    print("\nTesting LearningPathRecommender...")
    
    recommender = LearningPathRecommender()
    user_skills = ['Python', 'HTML/CSS']
    
    recommendations = recommender.recommend_learning_path(user_skills)
    print(f"Learning path recommendations: {len(recommendations)}")
    
    for rec in recommendations:
        print(f"   - Learn {rec['skill']} (from {rec['prerequisite']})")
    
    return len(recommendations) > 0

def run_all_tests():
    """Run all model tests"""
    print(" Starting ML Models Testing...\n")
    
    tests = [
        test_skill_matcher,
        test_smart_search,
        test_learning_recommender
    ]
    
    passed = 0
    for test in tests:
        try:
            if test():
                passed += 1
                print(" PASSED")
            else:
                print(" FAILED")
        except Exception as e:
            print(f" ERROR: {e}")
    
    print(f"\n Test Results: {passed}/{len(tests)} tests passed")
    return passed == len(tests)

if __name__ == "__main__":
    run_all_tests()
