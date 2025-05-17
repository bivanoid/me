import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://gyzebdhodmnzpdufivol.supabase.co'; // ganti dengan project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5emViZGhvZG1uenBkdWZpdm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5OTE4ODcsImV4cCI6MjA2MTU2Nzg4N30.1XYTKLxTMHocFRM5QfCTPiRQYyE8hhZMAtFrKib8dqc'; // ganti dengan anon key

if (supabaseUrl === process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
    console.error('Supabase URL atau Anon Key tidak dikonfigurasi dengan benar');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

