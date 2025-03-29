import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen flex justify-center items-center flex-col">
        <h2>blog-picker </h2>
        <div className="">
          <Link href={"/"}>home</Link>
        </div>
        <div>
          <Link href={"/work/slug"}>slug</Link>
        </div>
      </div>
    </div>
  );
}
