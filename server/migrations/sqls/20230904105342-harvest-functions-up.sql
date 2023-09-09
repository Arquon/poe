-- FUNCTION: public.add_harvest_attempt(integer, jsonb[], jsonb, integer, text)

-- DROP FUNCTION IF EXISTS public.add_harvest_attempt(integer, jsonb[], jsonb, integer, text);

CREATE OR REPLACE FUNCTION public.add_harvest_attempt(
	integer,
	jsonb[],
	jsonb,
	integer,
	text)
    RETURNS harvest
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

   INSERT INTO harvest (user_id, maps, prices, invitations, note) VALUES ($1, $2, $3, $4, $5) RETURNING *
$BODY$;

ALTER FUNCTION public.add_harvest_attempt(integer, jsonb[], jsonb, integer, text)
    OWNER TO postgres;

-- FUNCTION: public.get_harvest_full_attempt(integer)

-- DROP FUNCTION IF EXISTS public.get_harvest_full_attempt(integer);

CREATE OR REPLACE FUNCTION public.get_harvest_full_attempt(
	integer)
    RETURNS harvest
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

   SELECT * FROM harvest WHERE id = $1;
$BODY$;

ALTER FUNCTION public.get_harvest_full_attempt(integer)
    OWNER TO postgres;

-- FUNCTION: public.get_harvest_views_attempts_for_user(integer, integer, integer)

-- DROP FUNCTION IF EXISTS public.get_harvest_views_attempts_for_user(integer, integer, integer);

CREATE OR REPLACE FUNCTION public.get_harvest_views_attempts_for_user(
	integer,
	integer,
	integer)
    RETURNS TABLE(attempts jsonb, total integer) 
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$


   SELECT
    (SELECT json_agg(t.*) FROM (SELECT id, prices, maps[4]->'result' as total, invitations from harvest where user_id = $1 order by created_at desc limit $2 offset $2 * ($3 - 1)) as t) as attempts,
    (SELECT count(*) from harvest where user_id = $1) as total 
$BODY$;

ALTER FUNCTION public.get_harvest_views_attempts_for_user(integer, integer, integer)
    OWNER TO postgres;

-- FUNCTION: public.get_all_harvest_attempts(integer)

-- DROP FUNCTION IF EXISTS public.get_all_harvest_attempts(integer);

CREATE OR REPLACE FUNCTION public.get_all_harvest_attempts(
	integer)
    RETURNS SETOF harvest 
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$


   SELECT * from harvest order by created_at desc limit $1 
$BODY$;

ALTER FUNCTION public.get_all_harvest_attempts(integer)
    OWNER TO postgres;


-- FUNCTION: public.update_harvest_attempt(integer, jsonb[], jsonb, integer, text)

-- DROP FUNCTION IF EXISTS public.update_harvest_attempt(integer, jsonb[], jsonb, integer, text);

CREATE OR REPLACE FUNCTION public.update_harvest_attempt(
	integer,
	jsonb[],
	jsonb,
	integer,
	text)
    RETURNS harvest
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

   UPDATE harvest SET maps = $2, prices = $3, invitations = $4, note = $5 WHERE id = $1 RETURNING *
$BODY$;

ALTER FUNCTION public.update_harvest_attempt(integer, jsonb[], jsonb, integer, text)
    OWNER TO postgres;

-- FUNCTION: public.delete_harvest_attempt(integer)

-- DROP FUNCTION IF EXISTS public.delete_harvest_attempt(integer);

CREATE OR REPLACE FUNCTION public.delete_harvest_attempt(
	integer)
    RETURNS harvest
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

 
   DELETE FROM harvest WHERE id = $1 RETURNING *
$BODY$;

ALTER FUNCTION public.delete_harvest_attempt(integer)
    OWNER TO postgres;

-- FUNCTION: public.check_for_user_have_attempt(integer, integer)

-- DROP FUNCTION IF EXISTS public.check_for_user_have_attempt(integer, integer);

CREATE OR REPLACE FUNCTION public.check_for_user_have_attempt(
	integer,
	integer)
    RETURNS boolean
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

   SELECT exists (select id from harvest where id = $2 and user_id = $1)
$BODY$;

ALTER FUNCTION public.check_for_user_have_attempt(integer, integer)
    OWNER TO postgres;
