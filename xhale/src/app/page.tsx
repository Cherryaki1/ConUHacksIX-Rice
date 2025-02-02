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
  sentiment: 0 | 2 | 4; // Add sentiment field
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
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTweets = async () => {
    setLoading(true); // Start loading animation

    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/search?query=${searchQuery}`
      );
      const tweets: Tweet[] = response.data.tweets;
      setTweetList(tweets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false); // Stop loading animation
  };

  /*const processTweetsForChart = (tweets: Tweet[]): ChartData[] => {
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
  };*/

  const getRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
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
        className="absolute top-0 left-0 w-full h-full object-cover opacity-[.55] blur-sm"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <img
        src="/Logo.png"
        alt="Logo"
        className="absolute -top-6 left-4 m-4 w-40 h-40"
      />

      {/* Page content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-2 transition-all duration-500">
        {/* Search + Analyze */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center p-4 mt-4">
          {/* Search Box */}
          <div className="relative my-4 transition-all">
            <input
              type="text"
              className="block w-[40em] h-11 py-2 px-0 pl-2 text-sm text-white bg-stone-200 border-stone-200 focus:border-1 appearance-none dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:text-white focus:border-sky-500 peer rounded-l-lg bg-opacity-25"
              placeholder=""
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <label
  htmlFor="ID"
  className={`absolute left-1/2 transform -translate-x-1/2 text-sm text-white duration-300 
  -translate-y-8 scale-100 top-3 -z-10 origin-[0] peer-focus:text-sky-500 
  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
  peer-focus:scale-110 peer-focus:-translate-y-8
  ${loading ? "animate-pulse text-sky-300" : ""}`}
>
  {loading ? "Loading..." : "Search Key Word"}
</label>

          </div>{" "}
          <button
            className="px-3 border-sky-500 h-11 rounded-r-lg bg-sky-500 text-white hover:bg-white hover:text-sky-600 duration-300 flex items-center justify-center w-24"
            onClick={fetchTweets}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8h4l-3-3-3 3h4z"
                ></path>
              </svg>
            ) : (
              "Analyze"
            )}
          </button>
        </div>

        {chartData.length > 0 && <DonutChart data={chartData} size={200} />}

        <div className="opacity-[.80] absolute bottom-0 left-4 w-full overflow-x-auto gap-4 p-4 max-w-full snap-x snap-mandatory scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent flex">
          {tweetList.map((tweet, index) => (
            <div key={index} className="snap-start">
              <TweetCard tweet={tweet} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
