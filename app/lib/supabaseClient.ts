import { createClient } from "@supabase/supabase-js"

// TODO future: base on environment variables
const supabaseUrl = 'https://unsarvxsmdqjffrldgbq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODAxNzc3MiwiZXhwIjoxOTUzNTkzNzcyfQ.y3Jyg29zrf_ClWZZfE9D7N3b4MEsVlOQpDpB088rrz0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {fetch: fetch.bind(globalThis)})