import { client, sanityFetch } from "@/sanity/lib/client";
import {
  PortableText,
  PortableTextComponents,
  SanityDocument,
} from "next-sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Slideshow } from "@/components/slideshow";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
const components: PortableTextComponents = {
  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }) => <h1 className="">{children}</h1>,
    normal: ({ children }) => <p className="">{children}</p>,
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <ul className="mt-xl pl-8">{children}</ul>,
    number: ({ children }) => <ol className="mt-lg">{children}</ol>,
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => (
      <li style={{ listStyleType: "decimal" }}>{children}</li>
    ),
  },
  marks: {
    em: ({ children }) => <em className="">{children} </em>,
    strong: ({ children }) => (
      <strong className="text-[#5E809C] text-[1.125rem] italic font-[600]">
        {children}{" "}
      </strong>
    ),
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
  const SLUG_QUERY = `*[_type == "portfolio" && slug.current == "${slug}"] {
    'slideshow': images[]{asset->},
    credits,
      slideshow_bool,
      publishedAt,
      worktype,
      title,
      body,
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
  const slideshow = post.slideshow;
  console.log(post.mainImage.metadata.dimensions.width);

  return (
    <div className="">
      <div className="text-left text-[#2B4C37] uppercase text-5xl p-4 font-bold italic">
        {post.title}
      </div>
      <div className="bg-[#484641]">
        <Image
          className="flex justify-self-center"
          src={urlFor(post.mainImage).url()}
          alt={`${post.title}`}
          width={500}
          height={500}
        />
      </div>
      <div id="split-pane-portfolio-writeup" className="flex justify-evenly">
        <div id="slideshow-portfolio" className="w-3/6 text-center">
          <Slideshow slideshow={slideshow} />
        </div>
        <div
          id="Writeup"
          className="w-3/6 text-center text-5xl font-[Switzer] font-bold italic flex flex-col h-[500px] px-12 items-center justify-center "
        >
          <PortableText value={post.body} components={components} />
        </div>
      </div>
    </div>
  );
}

{
  /*
      _id: '2e77af9a-5fd5-498e-92d8-79e3f60b6b93',
      title: 'Brett Gray for Diesel x Complexcon',
      images: [ [Object], [Object], [Object], [Object] ],
      mainImage: { _type: 'image', asset: [Object] },
      worktype: [ [Object], [Object], [Object], [Object] ],
      credits: [ [Object], [Object] ],
      slideshow_bool: true,
      slug: { current: 'brett-gray-for-diesel-x-complexcon', _type: 'slug' },
      _type: 'portfolio',
      publishedAt: '2025-04-02',
      body: [ [Object] ],
      _createdAt: '2025-03-27T15:20:44Z'
      _updatedAt: '2025-04-03T20:59:05Z',
      _rev: 's81KCpZhrNBa8rEEelvY5e',
      stamp: { _type: 'image', asset: [Object] },

  */
}
