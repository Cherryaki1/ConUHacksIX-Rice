export default function Home() {
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
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-2">

        {/* Search Box */}
        <div className="relative my-4">
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
                    <label htmlFor="ID"
                        className="absolute 
                        left-1/2
                        text-sm 
                        text-white 
                        duration-300 
                        transform 
                        -translate-y-6 
                        scale-75 
                        top-3 
                        -z-10 
                        origin-[0] 
                        peer-focus:left-0 
                        peer-focus:text-emerald-600 
                        peer-focus:dark:text-emerald-500 
                        peer-placeholder-shown:scale-100 
                        peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 
                        peer-focus:-translate-y-6">ID</label>
                </div>

        <button className="p-3 rounded-3xl bg-emerald-600 text-white hover:bg-white hover:text-emerald-600 duration-300">Analyze</button>
      </div>

      {/* Optional: Background overlay for better text visibility */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
    </div>
  );
}