export default function ProductListSkeleton() {
  const numberOfSkeletons = 12;

  return (
    <section className="w-full flex justify-center">
      <div className="w-11/12 grid grid-cols-1 md:grid-cols-4 mt-14 p-12 gap-y-6">
        {Array.from({ length: numberOfSkeletons }).map((_, index) => (
          <div
            key={index}
            className="h-[480px] w-[300px] rounded-xl bg-[#f7f8fa] dark:bg-[#1c1c1e]"
          ></div>
        ))}
      </div>
    </section>
  );
}
