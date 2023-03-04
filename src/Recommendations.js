import React from "react"

export default function AddSong({song, chooseTrack} ) {
  console.log(song)
    function handlePlay() {
        chooseTrack(song)
      }

  return (
    <div className="flex items-center cursor-pointer p-2 border-b-2 border-gray-400 "  >
    <img src={song.albumUrl} className="w-28 h-28 object-contain" data-testid="clicking-div" onClick={handlePlay}style={{marginTop:"9px"}}/>
    <div className="pl-4 md:pl-6 flex-1">
      <div className="font-bold break-words md:text-lg text-1xl">{song.title}</div>
      <div className="text-gray-700 break-words font-bold text-1xl" >{song.artist}</div>
    </div>
    
    </div>
  );
}


