import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Hind } from "next/font/google";
import Image from "next/image";

const hind = Hind({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const HomeComponent = () => {
  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    speed: 2000,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1290, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9cdff19d] via-[#caf1fc9d] to-[#e0f2f79d] flex flex-col items-center justify-center text-center p-8">
      {/* Profile Section */}
      <div className="w-full flex flex-col p- items-center mt-24  gap-8">
        <Image
          src="/profile.jpg" // Add your profile image path
          alt=""
          width={180}
          height={180}
          className="rounded-full shadow-lg border-4 border-gray-600"
        />
        <p className="text-[#47AEDE] text-xl md:text-2xl font-medium">
          Hi There!
        </p>
        <h1 className="text-[#223740] font-bold text-4xl md:text-6xl">
          I'm Yogesh Kumar Saini
        </h1>
        <h2 className="text-[#223740] font-semibold uppercase text-lg md:text-xl">
          MERN Developer & Data Analyst
        </h2>

        <div className="flex gap-6 mt-6">
          <a
            href="/#portfolio"
            className="bg-[#48AFDE] text-white px-6 py-3 rounded-lg hover:bg-[#223740] transition-all duration-300"
          >
            Projects
          </a>
          <a
            href="/Yogesh_Resume.pdf"
            download="Yogesh_Kumar_Saini_Resume.pdf"
            className="bg-[#223740] text-white px-6 py-3 rounded-lg hover:bg-[#48AFDE] transition-all duration-300"
          >
            My Resume
          </a>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="mt-24 w-full max-w-5xl bg-white shadow-lg rounded-xl p-6">
  
        <Slider {...settings}>
          {["mongodb.png", "expressjs.png", "reactjs.png", "nextjs.png", "docker.png", "nodejs.png"].map(
            (tech, index) => (
              <Image
                key={index}
                src={`/${tech}`}
                alt={tech.split(".")[0]}
                width={50}
                height={50}
                className="h-12 grayscale opacity-4 hover:grayscale-0 hover:opacity-100 cursor-pointer"
              />
            )
          )}
        </Slider>
      </div>
    </div>
  );
};

export default HomeComponent;
