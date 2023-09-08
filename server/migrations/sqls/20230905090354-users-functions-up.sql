-- FUNCTION: public.add_user(character varying, character varying)

-- DROP FUNCTION IF EXISTS public.add_user(character varying, character varying);

CREATE OR REPLACE FUNCTION public.add_user(
	character varying,
	character varying)
    RETURNS users
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
   INSERT INTO users  (nickname, password) VALUES ($1, $2) RETURNING *
$BODY$;

ALTER FUNCTION public.add_user(character varying, character varying)
    OWNER TO postgres;

-- FUNCTION: public.get_users()

-- DROP FUNCTION IF EXISTS public.get_users();

CREATE OR REPLACE FUNCTION public.get_users(
	)
    RETURNS setof users
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
  SELECT * FROM users
$BODY$;

ALTER FUNCTION public.get_users()
    OWNER TO postgres;

-- FUNCTION: public.update_user(integer, character varying, character varying)

-- DROP FUNCTION IF EXISTS public.update_user(integer, character varying, character varying);

CREATE OR REPLACE FUNCTION public.update_user(
	integer,
	character varying,
	character varying)
    RETURNS users
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
  update users set nickname = $2, password = $3 where id = $1 RETURNING *
$BODY$;

ALTER FUNCTION public.update_user(integer, character varying, character varying)
    OWNER TO postgres;

    -- FUNCTION: public.delete_user(integer)

-- DROP FUNCTION IF EXISTS public.delete_user(integer);

CREATE OR REPLACE FUNCTION public.delete_user(
	integer)
    RETURNS users
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
  DELETE FROM users WHERE id = $1 RETURNING *
$BODY$;

ALTER FUNCTION public.delete_user(integer)
    OWNER TO postgres;

    -- FUNCTION: public.get_user_by_nickname(character varying)

-- DROP FUNCTION IF EXISTS public.get_user_by_nickname(character varying);

CREATE OR REPLACE FUNCTION public.get_user_by_nickname(
	character varying)
    RETURNS users
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
   SELECT * FROM users where nickname = $1
$BODY$;

ALTER FUNCTION public.get_user_by_nickname(character varying)
    OWNER TO postgres;


