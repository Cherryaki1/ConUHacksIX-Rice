import { useState, useEffect } from "react";

const tweetList = [{'tweet': 'Philly Plane Crash Crater\n\nYou Decide..... Plane or Missile ....\n\n#planecrash #phillyplanecrash', 'username': 'Culture War', 'timestamp': '2025-02-01T15:42:52.000Z'}, {'tweet': 'Bring back saying grace in public', 'username': 'The War on Beauty', 'timestamp': '2025-01-30T17:23:36.000Z'}];

export default function TweetCard({ tweet }) {
  return (
    <div className="w-80 bg-black text-white p-5 rounded-xl shadow-md flex-shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
        <div>
          <div className="text-base font-bold">{tweet.username}</div>
          <div className="text-sm text-gray-500">@{tweet.username.replace(/\s+/g, '').toLowerCase()}</div>
        </div>
      </div>

      <p className="mt-4 text-base leading-snug">
        {tweet.tweet}
      </p>

      <div className="mt-4 text-sm text-gray-500">{new Date(tweet.timestamp).toLocaleString()}</div>
    </div>
  );
}

export function TweetFeed({ tweets }) {
  const [tweetList, setTweetList] = useState([]);

  useEffect(() => {
    setTweetList(tweets);
  }, [tweets]);

  return (
    <div className="flex flex-nowrap overflow-x-auto gap-4 p-4">
      {tweetList.map((tweet, index) => (
        <TweetCard key={index} tweet={tweet} />
      ))}
    </div>
  );
}