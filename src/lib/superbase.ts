import { createClient } from "@supabase/supabase-js";

const superbaseUrl= process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const superbasePublisingKey= process.env.NEXT_PUBLIC_SUPABASE_PUBLISHING_KEY || ''

export const supabase = createClient(superbaseUrl, superbasePublisingKey);
