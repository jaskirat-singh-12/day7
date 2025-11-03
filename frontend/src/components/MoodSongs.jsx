import React, { useState } from "react";
import FacialExpression from "./FacialExpression";

const MoodSongs = () => {
  const [songs, setSongs] = useState([]);
  const [playing, setPlaying] = useState(null);

  const handlePlay = (index) => {
    setPlaying(playing === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-mono flex flex-col lg:flex-row gap-10 px-6 py-10">
      
      {/* LEFT: Mood Detection */}
      <div className="flex-1 bg-gray-800/40 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-xl hover:shadow-purple-500/30 transition duration-300 flex flex-col items-center">
        <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Mood Detection
        </h2>
        <p className="text-gray-300 text-center max-w-md mb-6">
          Detect your mood using the webcam and get instant song recommendations.
        </p>

        {/* Webcam from FacialExpression (no duplicate) */}
        <FacialExpression setSongs={setSongs} />
      </div>

      {/* RIGHT: Songs List */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          Recommended Songs
        </h2>

        {songs.length === 0 ? (
          <p className="text-gray-400">
            No songs yet — click "Detect" to see recommendations.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-8">
            {songs.map((song, index) => (
              <div
                key={index}
                className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-pink-500/30 transition-all duration-300 ease-in-out hover:-translate-y-2 border border-gray-700"
              >
                {/* Album Image */}
                <div className="w-full h-40 rounded-xl overflow-hidden mb-4">
                  <img
                    src={song.cover || "https://via.placeholder.com/300x300?text=Album+Cover"}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Song Details */}
                <div className="mb-4 text-center">
                  <p className="text-xl font-bold">{song.title}</p>
                  <p className="text-sm text-gray-400">by {song.artist}</p>
                </div>

                {/* Play Button */}
                <div className="flex flex-col items-center gap-3 text-purple-400">
                  {playing === index && (
                    <audio src={song.audio} autoPlay controls className="hidden" />
                  )}
                  <button
                    onClick={() => handlePlay(index)}
                    className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-md hover:scale-105 transition transform duration-300"
                  >
                    {playing === index ? (
                      <i className="ri-pause-fill text-white text-3xl"></i>
                    ) : (
                      <i className="ri-play-fill text-white text-3xl"></i>
                    )}
                  </button>

                  {/* Animated Waves */}
                  {playing === index && (
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="w-1 h-4 bg-purple-400 rounded animate-bounce"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        ></span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodSongs;
