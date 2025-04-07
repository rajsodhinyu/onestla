import Link from "next/link";
import Image from "next/image";

interface StampProps {
  title: string;
  image: string;
  link: string;
}

export default function Stamp({ image, link }: StampProps) {
  const rotation = Math.floor(Math.random() * 30) - 15;
  const position = {
    top: `${Math.floor(Math.random() * 1)}%`,
    left: `${Math.floor(Math.random() * 1)}%`,
  };
  return (
    <div className="">
      <Link href={`/work/${link}`}>
        <div className="bg-clip-content p-3">
          <div
            className=""
            style={{
              top: position.top,
              left: position.left,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <Image src={image} width={300} height={300} alt="test" />
          </div>
        </div>
      </Link>
    </div>
  );
}
