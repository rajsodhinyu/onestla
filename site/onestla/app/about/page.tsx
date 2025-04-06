import { sanityFetch } from "@/sanity/lib/client";
import {
  PortableText,
  PortableTextComponents,
  SanityDocument,
} from "next-sanity";
import Image from "next/image";
import Link from "next/link";

const components: PortableTextComponents = {
  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }) => <h1 className="">{children}</h1>,
    normal: ({ children }) => (
      <p className="">
        {children} <br></br>
      </p>
    ),
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <ul className="">{children}</ul>,
    number: ({ children }) => <ol className="">{children}</ol>,
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
    em: ({ children }) => <em className="">{children} </em>,
    strong: ({ children }) => (
      <strong className="text-[#5E809C] italic font-[600]">{children} </strong>
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
const data = await sanityFetch<SanityDocument[]>({
  query: `
  *[_id == "aboutpage"]`,
});
const post = data[0];
//console.log(data);

export default async function Page() {
  return (
    <div className="mx-4">
      <div id="subheader" className="relative w-full ">
        <div id="paper-tear" className="relative">
          <Image
            className=" w-full h-auto"
            src="https://cdn.sanity.io/images/3r2xt54q/production/0bded1f7582b0f578676bafb82bfa0b8a446fa68-800x1188.png"
            alt={`memo`}
            width={800}
            priority
            height={338}
          />
          <div className="absolute inset-0 flex flex-col">
            {/* Content area with top padding */}
            <div
              id="title"
              className="text-7xl font-bold italic w-full text-center mt-12 text-gray-800 text-[4vw]"
            >
              {post.title}
            </div>
            <div className="pt-12 px-12">
              <div
                className="font-[Switzer] font-medium mx-8 text-gray-800 italic leading-snug text-pretty text-left
                text-[2vw]"
              >
                <PortableText value={post.body} components={components} />
              </div>
            </div>

            {/* Social links fixed to bottom */}
            <div className="absolute bottom-8 left-0 right-0">
              <div className="flex justify-around font-bold italic underline  text-3xl text-[#5E809C]">
                <Link href={`${post.iglink}`}>Instagram</Link>
                <Link href={`mailto:${post.email}`}>Email</Link>
                <Link href={`${post.twitterlink}`}>X</Link>
              </div>
              <div
                id="title"
                className="text-2xl font- italic w-full text-center my-12 text-[#5E809C]"
              >
                On Est Là 2025
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
