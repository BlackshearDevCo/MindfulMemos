drop policy "users can select their own memos" on "public"."memos";

revoke delete on table "public"."memos" from "anon";

revoke insert on table "public"."memos" from "anon";

revoke references on table "public"."memos" from "anon";

revoke select on table "public"."memos" from "anon";

revoke trigger on table "public"."memos" from "anon";

revoke truncate on table "public"."memos" from "anon";

revoke update on table "public"."memos" from "anon";

revoke delete on table "public"."memos" from "authenticated";      

revoke insert on table "public"."memos" from "authenticated";      

revoke references on table "public"."memos" from "authenticated";  

revoke select on table "public"."memos" from "authenticated";      

revoke trigger on table "public"."memos" from "authenticated";     

revoke truncate on table "public"."memos" from "authenticated";    

revoke update on table "public"."memos" from "authenticated";      

revoke delete on table "public"."memos" from "service_role";       

revoke insert on table "public"."memos" from "service_role";

revoke references on table "public"."memos" from "service_role";

revoke select on table "public"."memos" from "service_role";

revoke trigger on table "public"."memos" from "service_role";

revoke truncate on table "public"."memos" from "service_role";

revoke update on table "public"."memos" from "service_role";

alter table "public"."memos" drop constraint "public_memos_thought_id_fkey";  

alter table "public"."memos" drop constraint "public_memos_todo_id_fkey";     

alter table "public"."memos" drop constraint "memos_pkey";

drop index if exists "public"."memos_pkey";

drop table "public"."memos";