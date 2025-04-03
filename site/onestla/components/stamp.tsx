import Link from "next/link";
import Image from "next/image";
interface StampProps {
  title: string;
  image: string;
  link: string;
}

export default function Stamp({ image, link }: StampProps) {
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
