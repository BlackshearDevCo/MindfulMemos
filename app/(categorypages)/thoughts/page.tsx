import Link from "next/link";

export default async function ThoughtsPage() {
  // return <EmptyList title="Embrace the quiet and enjoy the mental breather." />;

  return (
    <div className="grid grid-cols-thoughts gap-4 pt-4">
      <ThoughtPreview />
      <ThoughtPreview />
      <ThoughtPreview />
      <ThoughtPreview />
      <ThoughtPreview />
      <ThoughtPreview />
      <ThoughtPreview />
      <ThoughtPreview />
      <ThoughtPreview />
      <ThoughtPreview />
      <ThoughtPreview />
      <ThoughtPreview />
    </div>
  );
}

function ThoughtPreview() {
  return (
    <Link
      href="/"
      className="aspect-square border-2 border-secondary rounded-xl p-2 text-sm"
    >
      Lorem ipsum dolor sit amet, occaecat et velit voluptate culpa Lorem tempor
      nisi.
    </Link>
  );
}
