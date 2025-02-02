"use client";
import React, { useState } from "react";
import DonutChart from "./DonutChart";
import TweetCard from "./TweetCard";
import axios from "axios";

// Define the structure of a tweet
interface Tweet {
  tweet: string;
  username: string;
  timestamp: string;
}

// Define the structure of chart data
interface ChartData {
  label: string;
  value: number;
  color: string;
}

const Home: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [tweetList, setTweetList] = useState<Tweet[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchTweets = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/search?query=${searchQuery}`);
      const tweets: Tweet[] = response.data.tweets;

      // Process tweets to generate chart data
      const processedChartData = processTweetsForChart(tweets);
      setChartData(processedChartData);
      setTweetList(tweets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const processTweetsForChart = (tweets: Tweet[]): ChartData[] => {
    // Example processing: count occurrences of each username
    const counts = tweets.reduce<Record<string, number>>((acc, tweet) => {
      acc[tweet.username] = (acc[tweet.username] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([label, value]) => ({
      label,
      value,
      color: getRandomColor(),
    }));
  };

  const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

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
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center p-4 mt-4">
          {/* Search Box */}
          <div className="relative my-4 transition-all">
            <input
              type="text"
              className="block w-[40em] h-11 py-2 px-0 pl-2 text-sm text-white bg-stone-200 border-stone-200 focus:border-1 appearance-none dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:text-white focus:border-emerald-600 peer rounded-l-lg bg-opacity-25"              
              placeholder=""
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <label
              htmlFor="ID"
              className="absolute left-1/2 text-sm text-white duration-300 transform -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-110 peer-focus:-translate-y-8"
            >
              ID
            </label>
          </div>{" "}
            
          <button className="px-3 border-emerald-600 h-11 rounded-r-lg bg-emerald-600 text-white hover:bg-white hover:text-emerald-600 duration-300"
            onClick={fetchTweets}
          >
            Analyze
          </button>
        </div>

        {chartData.length > 0 && <DonutChart data={chartData} size={200} />}

        <div className="flex flex-nowrap overflow-x-auto gap-4">
          {tweetList.map((tweet, index) => (
            <TweetCard key={index} tweet={tweet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
