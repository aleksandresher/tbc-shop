"use client";
import React from "react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function PartnersSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,

    className: "myCustomCarousel",
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="px-14 mt-8  h-[200px] mb-12">
      <Slider {...settings}>
        <div>
          <Image
            src="/svrlogo.webp"
            alt="svr brand image"
            width={1740}
            height={440}
            className=" w-100 lg:w-[400px] h-[100px]"
          />
        </div>
        <div>
          <Image
            src="/bioderma.png"
            alt="svr brand image"
            width={1740}
            height={440}
            className="w-200 lg:w-[400px] h-[200px]"
          />
        </div>
        <div>
          <Image
            src="/svr.png"
            alt="svr brand image"
            width={1740}
            height={440}
            className="w-200 lg:w-[400px] h-[200px]"
          />
        </div>
        <div>
          <Image
            src="/avene.png"
            alt="avene brand image"
            width={1740}
            height={440}
            className="w-200 lg:w-[400px] h-[200px]"
          />
        </div>
        <div>
          <Image
            src="/nuxe.png"
            alt="nuxe brand image"
            width={1740}
            height={440}
            className="w-200 lg:w-[400px] h-[200px]"
          />
        </div>
        <div>
          <Image
            src="/caudalie.png"
            alt="caudalie brand image"
            width={1740}
            height={440}
            className="w-200 lg:w-[400px] h-[200px]"
          />
        </div>
        <div>
          <Image
            src="/mustela.png"
            alt="caudalie brand image"
            width={1740}
            height={440}
            className="w-200 lg:w-[400px] h-[200px]"
          />
        </div>
      </Slider>
    </div>
  );
}
