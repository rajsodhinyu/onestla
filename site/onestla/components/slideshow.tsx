"use client";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % slideshow.length;
    const prevIndex =
      currentIndex === 0 ? slideshow.length - 1 : currentIndex - 1;

    const preloadImage = (index: number) => {
      <Image
        src={urlFor(slideshow[index])
          .width(800)
          .quality(80) // Adjust quality
          .format("webp") // Use modern format
          ?.url()}
        alt="Slideshow Image"
        fill
        className="object-contain"
        sizes="800px"
        priority={currentIndex === 0} // Prioritize first image
        loading="eager"
      />;
    };

    preloadImage(nextIndex);
    preloadImage(prevIndex);
  }, [currentIndex, slideshow]);

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
    <div className="h-[600px] w-full relative flex sm:items-center justify-center rounded-sm">
      <button
        onClick={goToPrevious}
        className="absolute text-3xl sm:left-4 top-8 -translate-y-1/2 z-10 italic font-bold font-[Switzer] uppercase p-2  text-white rounded hover:bg-[#5E809C]"
      >
        Backward!
      </button>
      <button
        onClick={goToNext}
        className="absolute text-3xl sm:right-4 bottom-8 translate-y-1/2 z-10 italic font-bold font-[Switzer] uppercase p-2 text-white rounded hover:bg-[#5E809C]"
      >
        Onward!
      </button>
      <div className="w-[800px] h-[500px] relative">
        <Image
          src={urlFor(slideshow[currentIndex])
            .width(800)
            .quality(100) // Adjust quality
            .format("webp") // Use modern format
            .url()}
          alt="Slideshow Image"
          fill
          className="object-contain"
          sizes="800px"
          priority={currentIndex === 0} // Prioritize first image
          loading="eager"
        />
      </div>
    </div>
  );
};
