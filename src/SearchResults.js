import React from "react"

export default function SearchResults({ track, chooseTrack, addSong, currentRecommendationLength }) {

  function handlePlay() {
    chooseTrack(track)
  }

  function handleAddSong() {
    addSong(track)
    console.log(track)

  }




  return (
    <div className="flex items-center  p-2 border-b-2 border-gray-400 " >
      <img src={track.albumUrl} className="w-28 h-28 object-contain cursor-pointer" data-testid="clicking-div" onClick={handlePlay} />
      <div className="pl-4 md:pl-6 flex-1">
        <div className="font-bold break-words md:text-lg text-1xl cursor-pointer" onClick={handlePlay}>{track.title}</div>
        <div className="text-gray-700 break-words font-bold text-1xl cursor-pointer" onClick={handlePlay}>{track.artist}</div>
      </div>

      {currentRecommendationLength < 5 && (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={handleAddSong} className="cursor-pointer" >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 13h-6v6c0 .55-.45 1-1 1s-1-.45-1-1v-6H5c-.55 0-1-.45-1-1s.45-1 1-1h6V5c0-.55.45-1 1-1s1 .45 1 1v6h6c.55 0 1 .45 1 1s-.45 1-1 1z" />
        </svg>
      )}
    </div>
  );
}


