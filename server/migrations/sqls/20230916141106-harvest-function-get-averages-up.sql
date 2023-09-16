DROP FUNCTION IF EXISTS public.get_all_harvest_attempts(integer);
-- FUNCTION: public.get_user_harvest_attempts_by_id(integer, integer)
-- DROP FUNCTION IF EXISTS public.get_user_harvest_attempts_by_id(integer, integer);
CREATE OR REPLACE FUNCTION PUBLIC.get_user_harvest_attempts_by_id(integer, integer) RETURNS TABLE(ATTEMPTS JSONB, TOTAL integer) LANGUAGE 'sql' COST 100 VOLATILE PARALLEL UNSAFE ROWS 1000 AS $BODY$
SELECT (
		SELECT json_agg(t.*)
		FROM (
				SELECT *
				from harvest
				where user_id = $1
				order by created_at desc
				limit $2
			) as t
	) as attempts,
	(
		SELECT count(*)
		from harvest
		where user_id = $1
	) as total $BODY$;
ALTER FUNCTION PUBLIC.get_user_harvest_attempts_by_id(integer, integer) OWNER TO POSTGRES;
-- FUNCTION: public.get_harvest_attempts(integer)
-- DROP FUNCTION IF EXISTS public.get_harvest_attempts(integer);
CREATE OR REPLACE FUNCTION PUBLIC.get_harvest_attempts(integer) RETURNS TABLE(ATTEMPTS JSONB, TOTAL integer) LANGUAGE 'sql' COST 100 VOLATILE PARALLEL UNSAFE ROWS 1000 AS $BODY$
SELECT (
		SELECT json_agg(t.*)
		FROM (
				SELECT *
				from harvest
				order by created_at desc
				limit $1
			) as t
	) as attempts,
	(
		SELECT count(*)
		from harvest
	) as total $BODY$;
ALTER FUNCTION PUBLIC.get_harvest_attempts(integer) OWNER TO POSTGRES;