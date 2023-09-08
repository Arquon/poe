-- Table: public.users

-- DROP TABLE IF EXISTS public.users;
CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL NOT NULL ,
    nickname character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_nickname_key UNIQUE (nickname)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

-- Trigger: set_timestamp_users

-- DROP TRIGGER IF EXISTS set_timestamp_users ON public.users;

CREATE OR REPLACE TRIGGER set_timestamp_users
    BEFORE UPDATE 
    ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_set_timestamp();
