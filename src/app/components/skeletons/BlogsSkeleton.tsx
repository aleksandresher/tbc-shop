export default function BlogsGallerySkeleton() {
  const numberOfSkeletons = 3;

  return (
    <section className="w-full flex flex-col justify-center items-center py-14">
      <div className="w-11/12 grid grid-cols-1 md:grid-cols-3 mt-10  gap-y-6 gap-x-6">
        {Array.from({ length: numberOfSkeletons }).map((_, index) => (
          <div
            key={index}
            className="px-4 py-8 flex flex-col  items-center  h-[480px] w-[450px] rounded-xl bg-[#f7f8fa] dark:bg-[#1c1c1e]"
          >
            <div className="flex justify-center items-center gap-3 h-[200px] ">
              <p className="bg-[#f1f3f6] h-[40px] w-4/5 rounded-[10px] animate-pulse"></p>
            </div>
            <div className="h-[300px] w-[300px] bg-[#f1f3f6] mb-6 animate-pulse "></div>
            <div className="flex justify-center items-center gap-3 h-[200px] ">
              <p className="bg-[#f1f3f6] h-[40px] w-4/5 rounded-[10px] animate-pulse"></p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
