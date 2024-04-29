import { createClient } from '@supabase/supabase-js'

const URL = 'https://djodcnqnlelffihjhtuv.supabase.co'

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqb2RjbnFubGVsZmZpaGpodHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NTYyNDQsImV4cCI6MjAyODQzMjI0NH0.KbwfeRoDClBT7OVcP4KAx41X2DIFqYBRPLh5oL_IXBs'

export const supabase = createClient(URL, API_KEY);