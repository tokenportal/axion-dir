CREATE TABLE IF NOT EXISTS city_pages (
  id            bigint generated always as identity primary key,
  service_slug  text not null,
  city_slug     text not null,
  city_headline text not null,
  city_intro    text not null,
  meta_description text not null,
  created_at    timestamptz default now(),
  unique (service_slug, city_slug)
);

-- Allow public read
alter table city_pages enable row level security;
create policy "public read" on city_pages for select using (true);
