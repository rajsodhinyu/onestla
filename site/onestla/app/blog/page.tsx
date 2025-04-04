import Polaroid from "@/components/polaroid";
import { client, sanityFetch } from "@/sanity/lib/client";

import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { SanityDocument } from "next-sanity";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}



export default async function Page() {
  const BLOG_Q = `
    *[_type == "post"] {
          _id, title, mainImage, bigtag->{title},slug
        }`;
  const posts = await sanityFetch<SanityDocument[]>({ query: BLOG_Q });

  return (
    <div>
      <div
        className="grid grid-cols-1 justify-items-center mx-12 gap-4
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5"
      >
        {posts.map((post: SanityDocument) => {
          // Add null check for mainImage
          const imageUrl = post.mainImage
            ? urlFor(post.mainImage).width(400).height(500).url()
            : "";
          return (
            <Polaroid
              key={post._id}
              title={post.title}
              image={imageUrl}
              category={post.bigtag.title}
              link={post.slug.current}
            />
          );
        })}
      </div>
    </div>
  );
}
