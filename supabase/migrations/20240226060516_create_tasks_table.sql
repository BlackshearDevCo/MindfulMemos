create table
  public.tasks (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    title character varying not null,
    description text null,
    complete_by timestamp with time zone null,
    completed boolean not null default false,
    user_id text null,
    category_id bigint null,
    constraint tasks_pkey primary key (id),
    constraint tasks_category_id_fkey foreign key (category_id) references categories (id)
  ) tablespace pg_default;