DROP FUNCTION IF EXISTS public.add_user(character varying, character varying);
DROP FUNCTION IF EXISTS public.get_users();
DROP FUNCTION IF EXISTS public.update_user(integer, character varying, character varying);
DROP FUNCTION IF EXISTS public.delete_user(integer);
DROP FUNCTION IF EXISTS public.get_user_by_nickname(character varying);
DROP FUNCTION IF EXISTS public.check_for_user_have_attempt(integer, integer);

