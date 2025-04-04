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
    h1: ({ children }) => <h1 className="">{children}</h1>,
    normal: ({ children }) => <p>{children}</p>,
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
    'credits': credits[]->{name, role},
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
  // console.log(credits);
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
          <div
            id="title"
            className="text-3xl lg:text-[4.5rem] text-center font-bold italic mb-auto mx-8"
          >
            {post.title}
          </div>
          <table className="w-fit">
            <tbody>
              {credits.map((credit: SanityDocument) => (
                <tr key={`${credit.role} - ${credit.name}`}>
                  <td className="uppercase text-lg tracking-tight w-1/4 text-right pr-2">
                    {credit.role}
                  </td>
                  <td className="text-left pl-4">
                    <em className="not-italic  font-black text-3xl tracking-normal font-[Caveat]">
                      {credit.name}
                    </em>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div id="credits" className="text-left font-[500] text-xl mt-auto">
            {credits.map((credit: SanityDocument) => {
              return (
                <div
                  className="uppercase text-lg tracking-tight "
                  key={`${credit.role} - ${credit.name}`}
                >
                  <span className="">{credit.role} &nbsp;</span>
                  <em className="not-italic font-black text-3xl tracking-normal font-[Caveat]">
                    {credit.name}
                  </em>
                </div>
              );
            })}
          </div> */}
        </div>
      </div>
      <div id="subheader" className="flex p-4">
        <div className="text-lg w-full text-center text-[#5E809C] font-bold not italic ">
          <PortableText value={post.subtitle} components={components} />
        </div>
      </div>
    </div>
  );
}
