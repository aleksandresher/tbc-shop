export default function ProductListSkeleton() {
  const numberOfSkeletons = 12;

  return (
    <section className="w-11/12 grid grid-cols-3">
      {Array.from({ length: numberOfSkeletons }).map((_, index) => (
        <div
          key={index}
          className="h-[322px] w-[250px] rounded-xl bg-[#f7f8fa]"
        ></div>
      ))}
    </section>
  );
}
