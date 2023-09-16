DROP FUNCTION IF EXISTS public.get_user_harvest_attempts_by_id(integer, integer);
DROP FUNCTION IF EXISTS public.get_harvest_attempts(integer);
-- FUNCTION: public.get_all_harvest_attempts(integer)
-- DROP FUNCTION IF EXISTS public.get_all_harvest_attempts(integer);
CREATE OR REPLACE FUNCTION public.get_all_harvest_attempts(integer) RETURNS SETOF HARVEST LANGUAGE 'sql' COST 100 VOLATILE PARALLEL UNSAFE ROWS 1000 AS $BODY$
SELECT *
from harvest
order by created_at desc
limit $1 $BODY$;
ALTER FUNCTION public.get_all_harvest_attempts(integer) OWNER TO POSTGRES;