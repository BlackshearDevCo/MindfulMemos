import { getSession } from "@auth0/nextjs-auth0";

export default async function ThoughtsPage() {
  const session = await getSession();

  console.log(session?.user);

  return <div>Thoughts</div>;
}
