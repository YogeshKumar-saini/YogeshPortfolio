"use client";
import React, { useEffect, useState } from "react";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import { Hind } from "next/font/google";
import MySlider from "./components/SliderCard/MySlider";
import AboutMe from "./components/AboutMe/AboutMe";




const hind = Hind({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <main className="min-h-screen relative">
      <HomeComponent />   
      <div
        className="mt-0 pt-5 -mb-40"
        id="portfolio"
        style={{
          backgroundImage:
          "linear-gradient(-62deg, #EEF7FB 0 50%,  white 0% 100%)",
          width: "100%",
        }}
      >
         <div className="container m-auto">
          <p
            className="text-[300px]  select-none text-[#F7FBFD] md:pl-[50px] px-5 max-w-[750px] w-[100%] overflow-hidden"
            style={{ transform: "translate(0px,-20px)" }}
          >
            Portfolio
          </p>
          <div className="" style={{ transform: "translate(0px, -290px)" }}>
            <p className="text-[#48AFDE]  md:pl-[80px] px-5 font-extrabold text-5xl">
              Recent Works
            </p>
            <p
              className={`max-w-2xl md:pl-[80px] px-5 font-[300] text-[16px] text-[#47626D] leading-8 mt-5 ${hind.className}`}
            >
            Here are some of my most recent projects. As a dedicated machine learning engineer and full-stack developer, I am passionate about building intelligent solutions that drive real-world impact.
             I specialize in developing predictive models, optimizing algorithms, and integrating AI-driven functionalities into applications.
              Each project is a learning experience, allowing me to explore cutting-edge techniques in deep learning, data analytics, and automation.
               My goal is to create innovative and efficient solutions that enhance user experiences and streamline decision-making.
            </p>
          </div>
        </div>
        <div 
        style={{ transform: "translate(0px,-230px)" }}
        >
          <MySlider/>
        </div>
        </div>
        <AboutMe/>

      {isScrolled ? (
        <div
          onClick={() => window.scrollTo(0, 0)}
          className="bg-sky-400 p-4 w-fit rounded-xl fixed bottom-8 right-8 cursor-pointer z-50 animate-bounce"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </div>
      ) : (
        ""
      )}
    </main>
  );
}
