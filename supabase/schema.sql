-- Tabla de perfiles de clientes, vinculada 1 a 1 con auth.users de Supabase Auth
create table public.perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text not null,
  apellido text not null,
  telefono text not null,
  direccion text not null,
  lat double precision,
  lng double precision,
  place_id text,
  formatted_address text,
  created_at timestamptz not null default now()
);

alter table public.perfiles enable row level security;

-- Cada usuario solo puede leer, crear y actualizar su propio perfil
create policy "select_own_perfil"
  on public.perfiles for select
  using (auth.uid() = id);

create policy "insert_own_perfil"
  on public.perfiles for insert
  with check (auth.uid() = id);

create policy "update_own_perfil"
  on public.perfiles for update
  using (auth.uid() = id);
