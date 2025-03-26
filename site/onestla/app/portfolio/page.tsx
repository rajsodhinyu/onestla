import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen flex justify-center items-center flex-col">
        <div className="">
          <Link href={"/"}>home</Link>
        </div>
      </div>
    </div>
  );
}
