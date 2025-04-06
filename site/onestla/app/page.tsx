import SimpleCollagePage from "@/components/simplecollagepage";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="">
      <div className="relative w-screen h-dvh *:m-15 ">
        {/* Full-size SimpleCollagePage in the background */}
        <div className="absolute top-0 z-20  p-4  *:bg-none text-black ">
          <div className="font-bold text-[2.5vh] italic font-[Caveat] -mb-10">
            Welcome to...
          </div>
        </div>
        {/* Top part of envelope */}
        <div className="bg-[#f5f5dc] absolute z-10 top-0 left-0 right-0 h-[15%] border-blue-600 border-0 rounded-t-lg justify-between flex flex-wrap lg:flex-nowrap items-center text-[#671E1E]">
          <div className="text-[12vw] mt-10 sm:mt-[5%] md:mt-8 sm:text-[10vh] font-[800] italic self-center font-[Switzer] tracking-wide ml-8 ">
            on est là
          </div>
          <div className="*:mx-2 align-middle items-center flex max-sm:mt-10">
            <Link href={"/blog"} className="text-center">
              <Image
                className="h-[10vh] w-auto"
                src="https://cdn.sanity.io/images/3r2xt54q/production/17528ae862e466a9c59fc5d847a837bc908b3427-619x521.png"
                alt="blog-stamp"
                width={619}
                height={521}
              />
            </Link>
            <Link href={"/work"} className="text-center">
              <Image
                className="h-[10vh] w-auto "
                src="https://cdn.sanity.io/images/3r2xt54q/production/210ed14a45a5fa5b1034fa10ac318da02a3ec3af-690x540.png"
                alt="work-stamp"
                width={690}
                height={540}
              />
            </Link>
            <Link href={"/about"} className="text-center">
              <Image
                className="h-[10vh] w-auto "
                src="https://cdn.sanity.io/images/3r2xt54q/production/63b854ea75268b0aa674aaf6a9bbd820e8de012d-494x552.png"
                alt="about-stamp"
                width={494}
                height={552}
              />
            </Link>
          </div>
        </div>

        {/* Bottom [par]t of envelope */}
        <div className="absolute bottom-0 left-0 right-0 h-[75%] border-green-600 border-0">
          <div className="absolute inset-0 overflow-clip  rounded-b-lg ">
            <SimpleCollagePage />
          </div>
        </div>

        {/* Left side of envelope */}

        {/* Right side of envelope */}
        <div className="absolute z-0 top-[14%] bg-[#f5f5dc] bottom-[0%] right-0 w-[30%]  border-yellow-600 rounded-r-lg border-0 md:inline hidden font-[Caveat] ">
          <div className="bottom-[5%] left-[5%] leading-none absolute text-[5.5vh] *:border-b-1 *:w-[26vw] ">
            <div> For:</div>
            <div> creatives</div>
            <div> dreamers</div>
            <div> explorers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
