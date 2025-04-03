import { sanityFetch } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const SLUG_QUERY = `*[_type == "portfolio" && slug.current == "${slug}"]`;
  const posts = await sanityFetch<SanityDocument[]>({ query: SLUG_QUERY });
  const post = posts[0];
  return <div>this is the page for {post.title}</div>;
}
