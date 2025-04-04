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
    normal: ({ children }) => <p className="">{children}</p>,
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
const data = await sanityFetch<SanityDocument[]>({
  query: `
  *[_id == "aboutpage"]`,
});
const post = data[0];
console.log(data);

export default async function Page() {
  return (
    <div className="mx-4">
      <div
        id="title"
        className="text-7xl font-bold italic w-full text-center my-12"
      >
        {post.title}
      </div>
      <div id="subheader" className="relative w-full ">
        <div id="paper-tear" className="relative">
          <Image
            className="w-full h-auto"
            src="https://cdn.sanity.io/images/3r2xt54q/production/df27f9bb5522717ecb6948e25668aed43af904bb-800x208.png"
            alt={`tear`}
            width={800}
            height={338}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-base font-[Switzer] font-[600] text-black italic text-left mx-12 -mt-18">
              <PortableText value={post.body} components={components} />
            </div>
          </div>
          <div className="relative w-full flex justify-around font-bold italic text-3xl text-[#5E809C]">
            <Link href={`${post.iglink}`}>Instagram</Link>
            <br></br>
            <Link href={`mailto:${post.email}`}>Email</Link>
            <br></br>
            <Link href={`${post.twitterlink}`}>X</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
