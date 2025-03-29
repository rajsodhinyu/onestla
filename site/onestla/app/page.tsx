import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen flex justify-center items-center flex-col">
        <h2>onestla </h2>
        <div className="">
          <Link href={"blog"}>blog</Link>
        </div>
        <div>
          <Link href={"work"}>work</Link>
        </div>
      </div>
    </div>
  );
}
