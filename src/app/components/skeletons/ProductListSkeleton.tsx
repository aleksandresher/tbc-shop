export default function ProductListSkeleton({
  itemNumber,
}: {
  itemNumber: number;
}) {
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="h-[80px] animate-pulse "></div>
      <div className="w-11/12 grid grid-cols-1 md:grid-cols-4 mt-10 p-12 gap-y-6 gap-x-6">
        {Array.from({ length: itemNumber }).map((_, index) => (
          <div
            key={index}
            className="px-4 py-8 flex flex-col h-[480px] w-[350px] rounded-xl bg-[#f7f8fa] dark:bg-[#1c1c1e]"
          >
            <div className="h-[200px] w-[300px] bg-[#f1f3f6] mb-6 animate-pulse"></div>
            <div className="flex flex-col items-center gap-3 h-[200px] ">
              <p className="bg-[#f1f3f6] h-[40px] w-4/5 rounded-[10px] animate-pulse"></p>
              <p className="bg-[#f1f3f6] h-[40px] w-4/5 rounded-[10px] animate-pulse"></p>
              <p className="bg-[#f1f3f6] h-[40px] w-4/5 rounded-[10px] animate-pulse"></p>
              <p className="bg-[#f1f3f6] h-[40px] w-4/5 rounded-[10px] animate-pulse"></p>
              <div></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
