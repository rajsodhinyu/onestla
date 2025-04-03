import Link from "next/link";
import Image from "next/image";
interface PolaroidProps {
  title: string;
  image: string;
  link: string;
}

export default function Stamp({ image, link }: PolaroidProps) {
  console.log("new polaroid");
  console.log(image);
  return (
    <div className="relative place-self-center">
      <Link href={`/work/${link}`}>
        <div className="bg-clip-content p-3">
          <Image src={image} width={300} height={300} alt="test" />
        </div>
      </Link>
    </div>
  );
}
