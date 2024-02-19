create policy "Users can create their own todos"
on "public"."todos"
as permissive
for insert
to public
with check ((auth.user_id() = user_id));