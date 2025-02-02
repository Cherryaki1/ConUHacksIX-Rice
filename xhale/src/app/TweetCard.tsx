const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
    // Set border color based on sentiment
    const borderColor =
      tweet.sentiment === 4
        ? "border-green-500"
        : tweet.sentiment === 0
        ? "border-red-500"
        : "border-gray-500";
  
    return (
      <div
        className={`w-80 h-[16em] bg-black text-white p-5 rounded-xl shadow-md flex-shrink-0 border-4 ${borderColor} flex flex-col justify-between`}
      >
        {/* Header with User Info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
          <div>
            <div className="text-base font-bold">{tweet.username}</div>
            <div className="text-sm text-gray-500">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()}
            </div>
          </div>
        </div>
  
        {/* Tweet Content */}
        <p className="mt-2 text-base leading-snug flex-1 overflow-y-auto">
          {tweet.tweet}
        </p>
  
        {/* Timestamp */}
        <div className="mt-2 text-sm text-gray-500">
          {new Date(tweet.timestamp).toLocaleString()}
        </div>
      </div>
    );
  };
  
  export default TweetCard;
  