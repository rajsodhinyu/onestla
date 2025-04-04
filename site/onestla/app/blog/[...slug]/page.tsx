import { client, sanityFetch } from "@/sanity/lib/client";
import {
  PortableText,
  PortableTextComponents,
  SanityDocument,
} from "next-sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";

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
      <strong className="text-[#5E809C] italic">{children} </strong>
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
  const SLUG_QUERY = `*[_type == "post" && slug.current == "${slug}"] {
    bigtag->{title},
    publishedAt,
    'credits': credits[]->{name, role, link},
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
  const credits = post.credits;

  const date = new Date(post.publishedAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  console.log(formattedDate);
  return (
    <div className="p-4">
      <div id="splitpane" className="flex">
        <div id="mainImage" className="w-3/6">
          <Image
            className="justify-self-center "
            src={urlFor(post.mainImage).url()}
            alt={`${post.title}`}
            width={post.mainImage.metadata.dimensions.width}
            height={post.mainImage.metadata.dimensions.height}
          />
        </div>
        <div
          id="title-credits"
          className="w-3/6 ml-3 flex flex-col text-[#5E809C] "
        >
          <div className="text-center uppercase font-bold text-black">
            {post.bigtag.title} • {formattedDate}
          </div>
          <div
            id="title"
            className="text-7xl font-[Switzer] text-center font-bold italic mt-24 mb-auto"
          >
            {post.title}
          </div>
          <table className="w-fit">
            <tbody>
              {credits.map((credit: SanityDocument) => (
                <tr key={`${credit.role} - ${credit.name}`}>
                  <td className="uppercase font-[Switzer] text-xl tracking-tight w-1/4 text-left pr-2 text-black">
                    {credit.role}
                  </td>
                  <td className="text-left pl-4">
                    <em className="not-italic  font-black text-2xl tracking-normal font-[Caveat]">
                      <Link href={`${credit.link}`}>{credit.name}</Link>
                    </em>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div id="subheader" className="relative w-full ">
        <div id="paper-tear" className="relative">
          <Image
            className="w-full h-auto"
            src="https://cdn.sanity.io/images/3r2xt54q/production/df27f9bb5522717ecb6948e25668aed43af904bb-800x208.png"
            alt={`${post.title}`}
            width={800}
            height={338}
            layout="responsive"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-[Switzer] text-black italic text-center px-4">
              <PortableText value={post.subtitle} components={components} />
            </div>
          </div>
        </div>
      </div>
      <div className="inset-0 flex items-center justify-center">
        <div className="text-lg font-[Switzer] text-white font-light -ml-6">
          <PortableText value={post.body} components={components} />
        </div>
      </div>
    </div>
  );
}
