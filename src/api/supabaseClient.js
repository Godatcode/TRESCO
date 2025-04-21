// src/api/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Fetch Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Create and export the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;