from flask import Flask, jsonify
from flask_cors import CORS
from routes import init_routes
from db_manager import DatabaseManager
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Flask
app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY')

# Initialize database manager
db_manager = DatabaseManager()

# Initialize routes
init_routes(app)

@app.route('/')
def home():
    return jsonify({
        'message': 'Skill Swap Platform API with Supabase',
        'status': 'running',
        'database': 'Supabase connected'
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        # Test database connection
        users = db_manager.get_all_users_with_skills()
        return jsonify({
            'status': 'healthy',
            'database': 'connected',
            'users_count': len(users)
        })
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
