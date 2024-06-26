import Image from "next/image";
import Link from "next/link";
import { getI18n } from "@/app/locales/server";

export default async function Gallery() {
  const t = await getI18n();
  return (
    <section className="flex flex-col items-center pt-14 px-14  gap-y-5 md:gap-y-14 mb-5 lg:mb-12">
      <div className="flex flex-col gap-5 md:gap-6 md:flex-row items-center">
        <div className="flex rounded-[10px] shadow-lg w-fit dark:border dark:border-white">
          <div className="flex flex-col items-center justify-around p-2">
            <p className="text-center">Skincare youll stick with</p>
            <p className="text-lg font-bold">Skin</p>
            <button className="border border-yellow-700 p-2 rounded-[5px] hover:bg-[#f5b886] hover:text-white">
              <Link href={`/en/shop`}>{t("buy")}</Link>
            </button>
          </div>
          <div>
            <Image
              src="/skincare2.jpg"
              width={300}
              height={300}
              alt="image of girl making skin care cream"
              className="h-[200px] w-auto  md:w-auto md:h-[250px]"
              priority={true}
            />
          </div>
        </div>
        <div className="flex rounded-[10px] shadow-lg w-fit dark:border dark:border-white">
          <div>
            <Image
              src="/bodycare.jpg"
              width={300}
              height={300}
              alt="image of girl making skin care cream"
              className="h-[200px] w-auto  md:w-auto md:h-[250px]"
              priority={true}
            />
          </div>
          <div className="flex flex-col items-center justify-around p-2">
            <p className="text-center">Body care is a choice</p>
            <p className="text-lg font-bold">Body</p>
            <button className="border border-yellow-700 p-2 rounded-[5px] hover:bg-[#f5b886] hover:text-white">
              <Link href={`/en/shop`}>{t("buy")}</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="flex rounded-[10px] shadow-lg w-fit dark:border dark:border-white ">
        <div className="flex flex-col items-center justify-around p-2">
          <p className="text-center">
            Life isnt perfect but your <br></br>hair can be
          </p>
          <p className="text-lg font-bold">Hair</p>
          <button className="border border-yellow-700 p-2 rounded-[5px] hover:bg-[#f5b886] hover:text-white">
            <Link href={`/en/shop`}>{t("buy")}</Link>
          </button>
        </div>

        <div>
          <Image
            src="/haircare.jpg"
            width={300}
            height={300}
            alt="image of girl making skin care cream"
            className="h-[200px] w-auto  md:w-auto md:h-[250px]"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}
