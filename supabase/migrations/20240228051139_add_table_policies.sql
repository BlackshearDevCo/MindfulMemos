ALTER TABLE categories
ALTER COLUMN user_id TYPE uuid
USING user_id::uuid;

-- CATEGORY POLICIES
CREATE POLICY "users can select their own categories" ON "public"."categories"
AS PERMISSIVE FOR SELECT
TO public
USING ((auth.uid() = user_id));

CREATE POLICY "users can insert their own categories" ON "public"."categories"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "users can update their own categories" ON "public"."categories"
AS PERMISSIVE FOR UPDATE
TO public
USING ((auth.uid() = user_id))
WITH CHECK (true);

CREATE POLICY "users can delete their own categories" ON "public"."categories"
AS PERMISSIVE FOR DELETE
TO public
USING ((auth.uid() = user_id));

-- THOUGHT POLICIES
CREATE POLICY "users can select their own thoughts" ON "public"."thoughts"
AS PERMISSIVE FOR SELECT
TO public
USING ((auth.uid() = user_id));

CREATE POLICY "users can insert their own thoughts" ON "public"."thoughts"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "users can update their own thoughts" ON "public"."thoughts"
AS PERMISSIVE FOR UPDATE
TO public
USING ((auth.uid() = user_id))
WITH CHECK (true);

CREATE POLICY "users can delete their own thoughts" ON "public"."thoughts"
AS PERMISSIVE FOR DELETE
TO public
USING ((auth.uid() = user_id));

-- TASK POLICIES
CREATE POLICY "users can select their own tasks" ON "public"."tasks"
AS PERMISSIVE FOR SELECT
TO public
USING ((auth.uid() = user_id));

CREATE POLICY "users can insert their own tasks" ON "public"."tasks"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "users can update their own tasks" ON "public"."tasks"
AS PERMISSIVE FOR UPDATE
TO public
USING ((auth.uid() = user_id))
WITH CHECK (true);

CREATE POLICY "users can delete their own tasks" ON "public"."tasks"
AS PERMISSIVE FOR DELETE
TO public
USING ((auth.uid() = user_id));
