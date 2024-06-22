import Image from "next/image";

export default function Gallery() {
  return (
    <section className="flex flex-col items-center pt-14 px-14 gap-y-14 mb-12">
      <div className="flex">
        <div className="flex rounded-[10px] shadow-lg w-fit mr-14">
          <div className="flex flex-col items-center justify-around p-2">
            <p className="text-center">Skincare youll stick with</p>
            <p className="text-lg font-bold">Skin</p>
            <button className="border border-yellow-700 p-2 rounded-[5px] hover:bg-[#f5b886] hover:text-white">
              Shop now
            </button>
          </div>
          <div>
            <Image
              src="/skincare2.jpg"
              width={300}
              height={300}
              alt="image of girl making skin care cream"
              className="h-[250px] w-auto  md:w-auto md:h-[250px]"
              priority={true}
            />
          </div>
        </div>
        <div className="flex rounded-[10px] shadow-lg w-fit ml-14">
          <div>
            <Image
              src="/bodycare.jpg"
              width={300}
              height={300}
              alt="image of girl making skin care cream"
              className="h-[250px] w-auto  md:w-auto md:h-[250px]"
              priority={true}
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
      </div>

      <div className="flex rounded-[10px] shadow-lg w-fit mr-14 ">
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
            width={300}
            height={300}
            alt="image of girl making skin care cream"
            className="h-[250px] w-auto  md:w-auto md:h-[250px]"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}
