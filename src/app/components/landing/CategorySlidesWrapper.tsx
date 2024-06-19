import Image from "next/image";

export default function Gallery() {
  return (
    <>
      <section className="grid grid-cols-2 pt-14 p-8 gap-y-10">
        <div className="flex rounded-[10px] shadow-lg w-fit mr-14">
          <div className="flex flex-col items-center justify-around p-2">
            <p className="text-center">Skincare youll stick with</p>
            <p className="text-lg font-bold">Face</p>
            <button className="border border-yellow-700 p-2 rounded-[5px] hover:bg-[#f5b886] hover:text-white">
              Shop now
            </button>
          </div>
          <div></div>
        </div>
        <div className="flex rounded-[10px] shadow-lg w-fit ml-14">
          <div>
            <Image
              src="/bodycare.jpg"
              width={500}
              height={300}
              alt="bodycare"
              className="rounded-l-[10px]"
            />
          </div>
          <div className="flex flex-col items-center justify-around p-2">
            <p className="text-center">Body care is a choice</p>
            <p className="text-lg font-bold">Body</p>
            <button className="border border-yellow-700 p-2 rounded-[5px] hover:bg-[#f5b886] hover:text-white">
              Shop now
            </button>
          </div>
        </div>
        <div className="flex rounded-[10px] shadow-lg w-fit mr-14">
          <div className="flex flex-col items-center justify-around p-2">
            <p className="text-center">
              Life isnt perfect but your <br></br>hair can be
            </p>
            <p className="text-lg font-bold">Hair</p>
            <button className="border border-yellow-700 p-2 rounded-[5px] hover:bg-[#f5b886] hover:text-white">
              Shop now
            </button>
          </div>

          <div>
            <Image
              src="/haircare.jpg"
              width={500}
              height={300}
              alt="bodycare"
              className="rounded-r-[10px]"
            />
          </div>
        </div>
        <Image
          src="/landing.jpg"
          width={1000}
          height={1000}
          alt="skincare"
          className="rounded-r-[10px]"
        />
      </section>
    </>
  );
}
