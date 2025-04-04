import { client, sanityFetch } from "@/sanity/lib/client";
import {
  PortableText,
  PortableTextComponents,
  SanityDocument,
} from "next-sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const components: PortableTextComponents = {
  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }) => (
      <h1 className="text-2xl text-blue-800">{children}</h1>
    ),
    normal: ({ children }) => (
      <p>
        {children} <br />
      </p>
    ),
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <ul className="mt-xl">{children}</ul>,
    number: ({ children }) => <ol className="mt-lg">{children}</ol>,
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <li style={{ listStyleType: "disc" }}>{children}</li>
    ),
    number: ({ children }) => (
      <li style={{ listStyleType: "decimal" }}>{children}</li>
    ),
  },
  marks: {
    em: ({ children }) => <em className="text-tgs-purple">{children} </em>,

    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a className="underline text-pink-600" href={value.href} rel={rel}>
          {children}
        </a>
      );
    },
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const SLUG_QUERY = `*[_type == "post" && slug.current == "${slug}"] {
    bigtag->{title},
    credits,
    subtitle,
    _id,
    body,
    title,
    slideshow,
    mainImage{
      ...,
      ...asset-> {
        altText,
        caption,
        metadata{
        dimensions{
        width,
          height
        }
        }
      }
    }
  }`;
  const posts = await sanityFetch<SanityDocument[]>({ query: SLUG_QUERY });
  const post = posts[0];
  console.log(post.subtitle);
  return (
    <div className="p-4">
      <div className="flex">
        <div className="w-3/6">
          <Image
            className="justify-self-center "
            src={urlFor(post.mainImage).url()}
            alt={`${post.title}`}
            width={post.mainImage.metadata.dimensions.width}
            height={post.mainImage.metadata.dimensions.height}
          />
        </div>
        <div className="text-5xl w-3/6 text-center ml-3 text-[#5E809C] font-bold italic">
          {post.title}
        </div>
      </div>
      <div className="flex p-4">
        <div className="text-5xl w-full text-center ml-3 text-[#5E809C] font-bold italic">
          <PortableText value={post.subtitle} components={components} />
        </div>
      </div>
    </div>
  );
}
