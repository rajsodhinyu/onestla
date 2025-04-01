import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <h2>work-picker </h2>
        <Link href={"/work/slug"}>slug</Link>
      </div>
    </div>
  );
}
