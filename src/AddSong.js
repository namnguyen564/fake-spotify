import React from "react"

export default function AddSong({song, chooseTrack, removeSong} ) {

    function handlePlay() {
        chooseTrack(song)
      }
      function handleRemoveSong(){
        removeSong(song)
      }
   
  return (
  
   <div className="flex items-center cursor-pointer p-2 border-b-2 border-gray-400 "  data-testid="clicking-div"style={{paddingTop:"14px"}}>
    <img src={song.image} className="w-16 h-16 object-contain" onClick={handlePlay}/>
    <div className="pl-4 md:pl-6 flex-1">
      <div className="font-bold break-words md:text-lg text-1xl">{song.name}</div>
      <div className="text-gray-700 break-words font-bold text-1xl" >{song.artist}</div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={handleRemoveSong}>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
</svg>

    </div>
  );
}


