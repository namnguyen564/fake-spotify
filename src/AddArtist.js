import React from "react"

export default function AddArtist({key,artist,currentRecommendationLength,removeArtist} ) {

    function handleRemoveArtist(){
        removeArtist(key)
      }

  return (
    <div className="flex items-center cursor-pointer p-2 border-b-2 border-gray-400 "  data-testid="clicking-div"style={{paddingTop:"14px"}}>
    <img src={artist.artistImage} className="w-16 h-16 object-contain"/>
    <div className="pl-4 md:pl-6 flex-1">
      <div className="font-bold break-words md:text-lg text-1xl">{artist.artistName}</div>
   
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={handleRemoveArtist}>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
</svg>

    </div>
  );
}
