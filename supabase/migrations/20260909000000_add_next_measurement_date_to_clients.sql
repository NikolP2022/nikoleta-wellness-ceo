alter table public.clients
  add column if not exists next_measurement_date date;

create index if not exists clients_user_next_measurement_idx
  on public.clients(user_id, next_measurement_date);
