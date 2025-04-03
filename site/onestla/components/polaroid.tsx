import Link from "next/link";
import Image from "next/image";

interface PolaroidProps {
  title: string;
  image: string;
  category: string;
  link: string;
}

export default function Polaroid({
  title,
  image,
  category,
  link,
}: PolaroidProps) {
  // console.log("new polaroid");
  // console.log(image);
  return (
    <div className="relative ">
      <Link href={`/blog/${link}`}>
        <Image
          className="absolute z-20"
          src="https://cdn.sanity.io/images/3r2xt54q/production/8c15feacec8dce141f05148d6d05a0fabc7121c6-735x893.png"
          width={735}
          height={893}
          alt="test"
        />
        <div className="bg-indigo-500 bg-clip-content p-3">
          <Image src={image} width={400} height={500} alt="test" />
        </div>
      </Link>
      <div
        className="absolute z-30 inset-x-0 text-black
         w-full border-red px-5 font-[Caveat] font-bold
        bottom-[4%]
        text-justify
        text-3xl
        sm:text-2xl
        md:text-xl
        2xl:text-2xl"
      >
        {title}
      </div>
      <div
        className="absolute z-30 top-0.5 left-3 text-center text-black
         w-1/6 text-xs font-[Caveat] font-bold
        sm:
        md:
        lg:
        xl:
        "
      >
        {category}
      </div>
    </div>
  );
}
