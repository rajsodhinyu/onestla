import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <div className="text-left *:m-3 justify-between flex sm:w-max">
      <Link href={"/"} className="text-center">
        <Image
          className="w-50"
          src="https://cdn.sanity.io/images/3r2xt54q/production/de4e903086ce13bc2b271bb080633ba4d0129e94-945x559.png"
          alt="home-stamp"
          width={945}
          height={559}
        />
      </Link>
      <Link href={"/blog"} className="text-center">
        <Image
          className="w-[8.9rem]"
          src="https://cdn.sanity.io/images/3r2xt54q/production/17528ae862e466a9c59fc5d847a837bc908b3427-619x521.png"
          alt="blog-stamp"
          width={619}
          height={521}
        />
      </Link>
      <Link href={"/work"} className="text-center">
        <Image
          className="w-[9.6rem]"
          src="https://cdn.sanity.io/images/3r2xt54q/production/210ed14a45a5fa5b1034fa10ac318da02a3ec3af-690x540.png"
          alt="work-stamp"
          width={690}
          height={540}
        />
      </Link>
      <Link href={"/about"} className="text-center">
        <Image
          className="w-[6.8rem]"
          src="https://cdn.sanity.io/images/3r2xt54q/production/63b854ea75268b0aa674aaf6a9bbd820e8de012d-494x552.png"
          alt="about-stamp"
          width={494}
          height={552}
        />
      </Link>
    </div>
  );
}
