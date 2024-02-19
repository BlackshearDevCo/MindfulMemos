create policy "users can select their own categories"
on "public"."categories"
as permissive
for select
to public
using ((auth.user_id() = user_id));