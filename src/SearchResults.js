import React from "react"

export default function SearchResults({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }


  return (
    <div className="flex items-center cursor-pointer  p-2 border-b-2 border-gray-400" onClick={handlePlay}>
 

 <img src={track.albumUrl} className="w-32 h-32 object-contain" />
      <div style={{paddingLeft:18}}>
      <div className="font-bold">{track.title}</div>
<div className="text-gray-700 font-bold">{track.artist}</div>

      </div>
    </div>
  );
}


