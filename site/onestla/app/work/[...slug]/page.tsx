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
      stamp,
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
  //console.log(post.mainImage.metadata.dimensions.width);

  return (
    <div className="">
      <div className="flex-wrap flex w-full">
        <div className="sm:text-left w-full text-center text-[#5E809C] text-[10vw] p-4 font-bold italic flex">
          {post.title}
        </div>
      </div>
      <div className="">
        <Image
          className="flex justify-self-center"
          src={urlFor(post.mainImage).url()}
          alt={`${post.title}`}
          width={500}
          height={500}
          priority
        />
      </div>
      <div
        id="split-pane-portfolio-writeup"
        className="flex justify-evenly p-14 flex-wrap-reverse sm:flex-nowrap"
      >
        <div
          id="slideshow-portfolio"
          className="sm:w-3/6 sm:h-3/6 w-full text-center bg-[url(https://cdn.sanity.io/images/3r2xt54q/production/edc41e8820eca1daea8dfb9badeeab0c56745164-1000x538.png)] rounded-lg sm:mx-0"
        >
          <Slideshow slideshow={slideshow} />
        </div>
        <div
          id="Writeup"
          className="text-center text-xl sm:text-3xl font-bold italic flex flex-col mb-14 sm:mb-0 sm:h-[500px] px-12 items-center justify-center font-[Caveat] text-white"
        >
          <PortableText value={post.body} components={components} />
        </div>
      </div>
    </div>
  );
}
