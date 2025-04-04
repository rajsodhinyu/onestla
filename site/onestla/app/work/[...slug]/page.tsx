import { client, sanityFetch } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const SLUG_QUERY = `*[_type == "portfolio" && slug.current == "${slug}"] {
    images,
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
  console.log(post);
  console.log(post.mainImage.metadata.dimensions.width);

  return (
    <div className="">
      <div className="text-left p-4 font-bold italic">{post.title}</div>
      <div className="bg-[#484641]">
        <Image
          className="flex justify-self-center"
          src={urlFor(post.mainImage).url()}
          alt={`${post.title}`}
          width={400}
          height={500}
        />
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
