"use client";
import React, { useState, useEffect } from "react";
import DonutChart from "./DonutChart";
import TweetCard from "./TweetCard";

export default function Home() {
  // const [isCentered, setIsCentered] = useState(true);
  // const [showChart, setShowChart] = useState(false);
  // const [fadeIn, setFadeIn] = useState(false);

  const chartData = [
    { label: "Category 1", value: 30, color: "red" },
    { label: "Category 2", value: 50, color: "blue" },
    { label: "Category 3", value: 20, color: "green" },
  ];

  // const handleAnalyzeClick = () => {
  //   setIsCentered(false);
  //   setTimeout(() => {
  //     setShowChart(true);
  //     setFadeIn(true);
  //   }, 500);
  // };

  // useEffect(() => {
  //   if (showChart) {
  //     setFadeIn(true);
  //   }
  // }, [showChart]);

  

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-75 blur-sm"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Page content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-2 transition-all duration-500">

        {/* Search + Analyze */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 p-4 mt-4">
          {/* Search Box */}
          <div className="relative my-4 transition-all">
            <input
              type="text"
              className="block w-[40em] py-2 px-0 pl-2 text-sm text-white bg-stone-200 border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:text-white focus:border-emerald-600 peer rounded-l-lg bg-opacity-25"
              placeholder=""
            />
            <label
              htmlFor="ID"
              className="absolute left-1/2 text-sm text-white duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-110 peer-focus:-translate-y-8"
            >
              ID
            </label>
          </div>{" "}
          {/* End Search Box */}
          <button className="px-3 border-emerald-600 h-9 rounded-r-lg bg-emerald-600 text-white hover:bg-white hover:text-emerald-600 duration-300">
            Analyze
          </button>
        </div>

        <DonutChart data={chartData} size={200} />

        {/* Horizontal Scroll Tweet Feed */}
        <div className="flex flex-nowrap overflow-x-auto gap-4">
          <TweetCard
            tweet={{
              username: "John Doe",
              tweet: "This is a tweet",
              timestamp: Date.now(),
            }}
          />
          <TweetCard
            tweet={{
              username: "Jane Doe",
              tweet: "This is another tweet",
              timestamp: Date.now(),
            }}
          />
          <TweetCard
            tweet={{
              username: "John Smith",
              tweet: "This is yet another tweet",
              timestamp: Date.now(),
            }}
          />
          <TweetCard
            tweet={{
              username: "Jane Doe",
              tweet: "This is another tweet",
              timestamp: Date.now(),
            }}
          />
          <TweetCard
            tweet={{
              username: "Jane Doe",
              tweet: "This is another tweet",
              timestamp: Date.now(),
            }}
          />
          <TweetCard
            tweet={{
              username: "Jane Doe",
              tweet: "This is another tweet",
              timestamp: Date.now(),
            }}
          />
          <TweetCard
            tweet={{
              username: "Jane Doe",
              tweet: "This is another tweet",
              timestamp: Date.now(),
            }}
          />
        </div>


      </div>
    </div>
  );
}
