import { client, sanityFetch } from "@/sanity/lib/client";
import {
  PortableText,
  PortableTextComponents,
  SanityDocument,
} from "next-sanity";
import Image from "next/image";
import Link from "next/link";
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
    'credits': credits[]->{name, role, link},
    'streets': worktype[]->{title},
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
  const credits = post.credits;
  const streets = post.streets;
  return (
    <div className="">
      <div className="flex w-full">
        <div className="w-full text-center text-[#5E809C] text-[8vw] p-4 font-bold italic leading-none border-red-900">
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
      <div className="w-full overflow-x-scroll flex justify-around gap-4 mt-10 ml-3">
        {streets.map((credit: SanityDocument) => (
          <div
            key={credit.title}
            className="h-auto text-center w-fit border-2 border-white drop-shadow-lg tracking-wider text-3xl rounded-xl text-nowrap uppercase p-3 bg-[#20365B] text-[#E2EEF3]  font-[Overpass] font-[600] pt-4"
          >
            {credit.title}
          </div>
        ))}
      </div>
      <div
        id="split-pane-portfolio-writeup"
        className="flex justify-evenly p-14 flex-wrap-reverse sm:flex-nowrap  border-red-900"
      >
        <div
          id="slideshow-portfolio"
          className="sm:w-3/6 sm:h-3/6 w-full text-center bg-[url(https://cdn.sanity.io/images/3r2xt54q/production/edc41e8820eca1daea8dfb9badeeab0c56745164-1000x538.png)] rounded-lg sm:mx-0"
        >
          <Slideshow slideshow={slideshow} />
        </div>
        <div className="sm:h-fill flex-col flex justify-around rounded-lg">
          <div
            id="Writeup"
            className="text-center text-xl sm:text-3xl font-bold italic  mb-14 sm:mb-0  px-12 items-center justify-center font-[Caveat] text-white  border-blue-900"
          >
            <PortableText value={post.body} components={components} />
          </div>
          <div id="credits" className="mx-6  border-purple-900 mb-8 sm:mb-0">
            <table className="w-fit">
              <tbody>
                {credits.map((credit: SanityDocument) => (
                  <tr key={`${credit.role} - ${credit.name}`}>
                    <td className="uppercase font-[Switzer]  text-[3vw] sm:text-xl tracking-tight w-2/4 text-left pr-2 text-white">
                      {credit.role}
                    </td>
                    <td className="text-left pl-4">
                      <em className="not-italic font-black text-[4vw] sm:text-2xl tracking-normal font-[Caveat] text-[#5E809C]">
                        <Link href={`${credit.link}`}>{credit.name}</Link>
                      </em>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
