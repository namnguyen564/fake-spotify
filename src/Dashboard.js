import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node"
import SearchResults from "./SearchResults";

const spotifyApi = new SpotifyWebApi({
  clientId: 'c08f355b3fe744f8ae7bb97dc1de955b',

})


export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([])

  
  useEffect(() => {
    if (!accessToken)return
    
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])


  useEffect(() => {
    console.log("searching")
    if (!search) return setSearchResults([])
    if (!accessToken) return
    console.log("searching")
    console.log(accessToken)
    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      
      console.log(res.body.tracks.items)
      if (cancel) return
      setSearchResults(
       
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height > smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

  
  return (
    <div>
      <h3 class="text-6xl font-bold font-mono bg-gradient-to-r from-red-300 to-blue-600 text-transparent bg-clip-text ml-10 mt-10" id="logo">Namify</h3>
      <div className="w-1/2 mx-auto mt-8">
        <div className="flex items-center border border-gray-300 rounded px-4 py-2">
          <input
            className="flex-grow outline-none pr-4 text-lg font-semibold text-gray-700"
            type="text"
            placeholder="Search for something..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="ml-4 text-lg font-semibold text-gray-700"></button>
        </div>
      </div>
      <div id="songList">
      <div class="grid grid-cols-4 gap-4">
  {searchResults.map(track => (
    <div class="flex flex-col items-center">
      <img src={track.albumUrl} class="w-32 h-32 object-cover rounded-lg" />
      <div class="mt-2">
        <div class="text-lg font-medium">{track.title}</div>
        <div class="text-gray-500">{track.artist}</div>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  )}