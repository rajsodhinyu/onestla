import Stamp from "@/components/stamp";
import { client, sanityFetch } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export default async function Page() {
  const BLOG_Q = `*[_type == "portfolio"] | order(publishedAt desc){
      _id,
      title,
        stamp, slug
      }`;
  const posts = await sanityFetch<SanityDocument[]>({ query: BLOG_Q });

  return (
    <div>
      <div
        className="grid mx-12 gap-4
        grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5"
      >
        {posts.map((post) => {
          const imageUrl = post.stamp
            ? urlFor(post.stamp).height(300).url()
            : null;
          return (
            <Stamp
              key={post._id}
              title={post.title}
              image={imageUrl ? imageUrl : ""}
              link={post.slug.current}
            />
          );
        })}
      </div>
    </div>
  );
}
