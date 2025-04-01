import Polaroid from "@/components/polaroid";

export default function Page() {
  return (
    <div>
      <div
        className="grid grid-cols-1 justify-items-center mx-12 gap-4
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5"
      >
        <Polaroid />
        <Polaroid />
        <Polaroid />
      </div>
    </div>
  );
}
