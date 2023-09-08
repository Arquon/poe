-- Table: public.harvest

-- DROP TABLE IF EXISTS public.harvest;

CREATE TABLE IF NOT EXISTS public.harvest
(
    id SERIAL NOT NULL,
    user_id integer NOT NULL,
    maps jsonb[] NOT NULL,
    prices jsonb NOT NULL,
    invitations integer NOT NULL,
    note text COLLATE pg_catalog."default",
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT harvest_pkey PRIMARY KEY (id),
    CONSTRAINT harvest_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.harvest
    OWNER to postgres;

-- Trigger: set_timestamp_harvest

-- DROP TRIGGER IF EXISTS set_timestamp_harvest ON public.harvest;

CREATE OR REPLACE TRIGGER set_timestamp_harvest
    BEFORE UPDATE 
    ON public.harvest
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_set_timestamp();