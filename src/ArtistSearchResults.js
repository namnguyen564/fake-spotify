import React from "react"

export default function SearchResults({artist,addArtist} ) {

  function handleAddArtist(){
    addArtist(artist)
    console.log(artist)
    
  }

  return (
    <div class="flex items-center justify-between cursor-pointer p-2 border-b-2 border-gray-400">
  <img src={artist.artistImage} class="w-32 h-32 object-contain" />
  <div class="pl-4 flex-grow">
    <div class="font-bold break-words md:text-lg text-1xl">{artist.artistName}</div>
  </div>
  <div class="flex-shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={handleAddArtist}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 13h-6v6c0 .55-.45 1-1 1s-1-.45-1-1v-6H5c-.55 0-1-.45-1-1s.45-1 1-1h6V5c0-.55.45-1 1-1s1 .45 1 1v6h6c.55 0 1 .45 1 1s-.45 1-1 1z" />
    </svg>
  </div>
</div>
  );
}


