DROP FUNCTION IF EXISTS public.add_harvest_attempt(integer, jsonb[], jsonb, integer, text);
DROP FUNCTION IF EXISTS public.get_harvest_full_attempt(integer);
DROP FUNCTION IF EXISTS public.get_harvest_views_attempts_for_user(integer);
DROP FUNCTION IF EXISTS public.update_harvest_attempt(integer, jsonb[], jsonb, integer, text);
DROP FUNCTION IF EXISTS public.delete_harvest_attempt(integer);
DROP FUNCTION IF EXISTS public.check_for_user_have_attempt(integer, integer);
