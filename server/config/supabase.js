const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || 
    supabaseUrl === 'your_supabase_project_url' || 
    supabaseKey === 'your_supabase_anon_key') {
  console.error('⚠️  Supabase configuration required!');
  console.error('');
  console.error('Please update your server/.env file with your Supabase credentials:');
  console.error('1. Create a Supabase project at https://supabase.com');
  console.error('2. Copy your project URL and anon key from Settings > API');
  console.error('3. Update SUPABASE_URL and SUPABASE_ANON_KEY in server/.env');
  console.error('4. Run the database migration from server/supabase-migration.sql');
  console.error('');
  console.error('Current values:');
  console.error(`SUPABASE_URL=${supabaseUrl || 'not set'}`);
  console.error(`SUPABASE_ANON_KEY=${supabaseKey || 'not set'}`);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;