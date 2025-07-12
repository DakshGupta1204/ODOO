import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

class SupabaseClient:
    def __init__(self):
        self.url = os.getenv('SUPABASE_URL')
        self.key = os.getenv('SUPABASE_ANON_KEY')
        self.client: Client = create_client(self.url, self.key)
    
    def get_client(self):
        return self.client

# Initialize Supabase client
supabase_client = SupabaseClient()
supabase = supabase_client.get_client()
