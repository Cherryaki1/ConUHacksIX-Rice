"use client";
import React, { useState, useEffect } from 'react';
import DonutChart from './DonutChart';

export default function Home() {
  const [isCentered, setIsCentered] = useState(true);
  const [showChart, setShowChart] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const chartData = [
    { label: 'Category 1', value: 30, color: 'red' },
    { label: 'Category 2', value: 50, color: 'blue' },
    { label: 'Category 3', value: 20, color: 'green' },
  ];

  const handleAnalyzeClick = () => {
    setIsCentered(false);
    setTimeout(() => {
      setShowChart(true);
      setFadeIn(true);
    }, 500);
  };

  useEffect(() => {
    if (showChart) {
      setFadeIn(true);
    }
  }, [showChart]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-75 blur-sm"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Add your page content here */}
      <div className={`relative z-10 flex flex-col items-center justify-center h-full space-y-2 transition-all duration-500 ${isCentered ? 'items-center' : 'items-start'}`}>
        {/* Search Box */}
        <div className={`relative my-4 transition-all duration-500 ${isCentered ? '' : 'mt-8'}`}>
          <input
            type="text"
            className="block
                        w-[40em]
                        py-2
                        px-0
                        test-sm
                        text-white
                        bg-stone-200
                        border-0
                        border-b-2
                        border-gray-300
                        appearance-none
                        dark:focus:border-emerald-500
                        focus:outline-none
                        focus:ring-0
                        focus:text-white
                        focus:border-emerald-600
                        peer
                        rounded-lg
                        bg-opacity-25"
            placeholder=""
            required
          />
          <label
            htmlFor="ID"
            className="absolute
                        left-1/2
                        text-sm
                        text-white
                        duration-300
                        transform
                        -translate-y-8
                        scale-100
                        top-3
                        -z-10
                        origin-[0]
                        peer-focus:text-emerald-600
                        peer-focus:dark:text-emerald-500
                        peer-placeholder-shown:scale-100
                        peer-placeholder-shown:translate-y-0
                        peer-focus:scale-110
                        peer-focus:-translate-y-8"
          >
            ID
          </label>
        </div>

        <button
          className="p-3 rounded-3xl bg-emerald-600 text-white hover:bg-white hover:text-emerald-600 duration-300"
          onClick={handleAnalyzeClick}
        >
          Analyze
        </button>
        {showChart && (
          <div className="flex flex-col items-center mt-8" style={{
            opacity: fadeIn ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}>
            <DonutChart data={chartData} size={200} />
            <div className="flex flex-wrap justify-center mt-8">
              <div className="w-[566px] h-[360px] relative bg-black  overflow-hidden">
                <div className="w-[115px] h-[22px] left-[82px] top-[47px] absolute text-[#858585] text-sm font-normal font-['Roboto']">@cryptobeastreal</div>
                <div className="w-[423px] h-[148px] left-[27px] top-[90px] absolute text-white text-base font-normal font-['Roboto'] leading-snug">I’ll send $10,000 to a follower  <br/><br/>I’ll post proof of payment, just like we did earlier today  <br/><br/>Like & follow, that’s it  <br/><br/>I’ll announce the winner within the next 12h</div>
                <div className="w-[248px] h-[19px] left-[19px] top-[328px] absolute text-[#71767b] text-sm font-normal font-['Roboto']">0:00 AM  ·  Feb 1, 2024</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Optional: Background overlay for better text visibility */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
    </div>
  );
}
