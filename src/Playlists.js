import React from "react"


export default function Playlists({ playlist, getPlaylistsSongs}) {

  function getPlaylistId(playlistId){
      getPlaylistsSongs(playlistId)
  }

 


  return (
 
 
<div className="flex items-center cursor-pointer  p-2 border-b-2 border-gray-400"   onClick={() => getPlaylistId(playlist.playlistId)}>
<img src={playlist.playlistImage} className="w-32 h-32 object-contain" style={{height:128,width:128}}/>
<h3 className="font-bold">{playlist.playlistName}</h3>

</div>

  );
}


