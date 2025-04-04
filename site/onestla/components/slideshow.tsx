"use client";
import { useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
const builder = imageUrlBuilder(client);

export const Slideshow = ({
  slideshow,
}: {
  slideshow: {
    asset: {
      _ref: string;
      metadata?: { dimensions: { width: number; height: number } };
    };
  }[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  function urlFor(source: SanityImageSource) {
    return builder.image(source);
  }

  const goToPrevious = () => {
    const newIndex =
      currentIndex === 0 ? slideshow.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex =
      currentIndex === slideshow.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!slideshow || slideshow.length === 0) {
    return null;
  }

  return (
    <div className="h-[600px] w-full  relative flex items-center justify-center rounded-sm">
      <button
        onClick={goToPrevious}
        className="absolute text-3xl left-4 top-1/2 -translate-y-1/2 z-10 italic font-bold font-[Switzer] uppercase p-2  text-white rounded hover:bg-[#5E809C]"
      >
        Backward
      </button>
      <button
        onClick={goToNext}
        className="absolute text-3xl right-4 top-1/2 -translate-y-1/2 z-10 italic font-bold font-[Switzer] uppercase p-2  text-white rounded hover:bg-[#5E809C]"
      >
        Onward!
      </button>
      <div className="w-[800px] h-[500px] relative">
        <Image
          src={urlFor(slideshow[currentIndex]).url()}
          alt="Slideshow Image"
          fill
          className="object-contain"
          sizes="800px"
        />
      </div>
    </div>
  );
};
