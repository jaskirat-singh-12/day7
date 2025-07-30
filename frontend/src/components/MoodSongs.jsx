import React, { useState } from 'react';

const MoodSongs = ({ songs }) => {

  const [playing, setPlaying] = useState(null)
  const handleplay = (index) =>{
    if(playing === index){
      setPlaying(null)
    }else{
      setPlaying(index)
    }
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono flex flex-col items-center px-4 ">
      <h2 className="text-3xl font-semibold mb-8 py-10 text-purple-400 text-center">
        Recommended Songs
      </h2>

      <div className="grid w-full max-w-6xl sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
        {songs.map((song, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            <div className="mb-3">
              <p className="text-lg font-bold">{song.title}</p>
              <p className="text-sm text-gray-400 pl-20">by {song.artist}</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-purple-400">
            {
              playing === index &&

              <audio src={song.audio}
              
               style={{
                display: 'none'

               }}
              autoPlay={playing === index}
                />
             
            }
             
              <div className="flex gap-3 text-2xl">
              
              <button onClick={()=>{
                handleplay(index)
              }}>
              {playing === index ? 
              <i 
                onClick={()=>{
                  setPlaying(false)
                }}
                className="ri-pause-mini-line cursor-pointer hover:text-purple-300 transition"></i>
                :
                <i
                onClick={()=>{
                  setPlaying(true)
                  // console.log(playing)
                }}
                 className="ri-play-circle-fill cursor-pointer hover:text-purple-300 transition"></i>


              }

              </button>
              
              {/* {
                (playing == false) ? 
                
                <i
                onClick={()=>{
                  setPlaying(true)
                  // console.log(playing)
                }}
                 className="ri-play-circle-fill cursor-pointer hover:text-purple-300 transition"></i>

                :
                <i 
                onClick={()=>{
                  setPlaying(false)
                }}
                className="ri-pause-mini-line cursor-pointer hover:text-purple-300 transition"></i>
              } */}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSongs;
