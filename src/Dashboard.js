import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node"
import SearchResults from "./SearchResults";
import Player from "./Player"
import Playlists from "./Playlists";

const spotifyApi = new SpotifyWebApi({
  clientId: 'c08f355b3fe744f8ae7bb97dc1de955b',
})



export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState("")
  const [userName, setName] = useState()
  const [userPhoto, setUserPhoto] = useState("")
  const [userId, setUserId] = useState("")
  const [displayUserPlaylists, setUserPlaylists] = useState([])
  const [playlistState, setPlaylistState] = useState(true)
  const [playlistSongs, setDisplayPlayListSongs] = useState([])
  const [playlistName, setPlaylistName] = useState("")


  useEffect(() => {
    if (!accessToken) return

    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])


  


  useEffect(() => {
    if (!accessToken) return
    console.log("user detail called!")
    console.log(accessToken)
    spotifyApi.getMe()
      .then(function (data) {
        console.log('Some information about the authenticated user', data.body);
        console.log('UserId is: ', data.body.id);
        setUserId(data.body.id)
        setName(data.body.display_name)
        setUserPhoto(data.body.images[0].url)

        // setDetails(data.body)
      }, function (err) {
        console.log('Something went wrong!', err);
      },);


  }, [accessToken])




  useEffect(() => {
    if (!accessToken) return

    console.log("user playlist called!")
    spotifyApi.getUserPlaylists(userId)
      .then(function (data) {
        console.log('Retrieved playlists', data.body.items);

        setUserPlaylists(

          data.body.items.map(eachPlaylist => {
            const url = eachPlaylist.tracks.href
            let playlistId = url.split('playlists/')[1].split('/')[0];
            console.log(playlistId);

            return {
              playlistName: eachPlaylist.name,
              playlistImage: eachPlaylist.images[0].url,
              playlistId: playlistId
            }
          })
        )

      }, function (err) {
        console.log('Something went wrong!', err);
      });
  }, [userId])



  // useEffect(() => {
  //   spotifyApi.getMySavedTracks({
  //     limit : 2,
  //     offset: 1
  //   })
  //   .then(function(data) {
  //     console.log('Done!');
  //     console.log(data.body)
  //   }, function(err) {
  //     console.log('Something went wrong!', err);
  //   });
  // },[accessToken])

  function chooseTrack(track) {
    setPlayingTrack(track)
    // setSearch("")
  }




  function getPlaylistsSongs(playlistId) {
    spotifyApi.getPlaylist(playlistId)
      .then(function (data) {
       
        console.log('Some information about this playlist', data.body);
        console.log(data.body.name)
        setPlaylistState(false)
        setPlaylistName(data.body.name)
        setDisplayPlayListSongs(data.body.tracks.items.map(eachSong => {
          // const biggestAlbumImage = eachSong.track.album.images.reduce(
          //   (biggest, image) => {
          //     if (image.height > biggest.height) return image
          //     return biggest
          //   },
          //   eachSong.album.images[0]
          // )

          return {
            artist: eachSong.track.artists[0].name,
            title: eachSong.track.name,
            uri: eachSong.track.uri,
            albumUrl: eachSong.track.album.images[0].url
            // albumUrl: biggestAlbumImage.url,
          }
        })
        )
      }, function (err) {
        console.log('Something went wrong!', err);
      });
  }




  useEffect(() => {
    console.log("searching")
    if (!search) return setSearchResults([])
    if (!accessToken) return

    console.log(accessToken)
    let cancel = false
    spotifyApi.searchTracks(search).then(res => {

      console.log(res.body.tracks.items)
      if (cancel) return
      setSearchResults(

        res.body.tracks.items.map(track => {
          const biggestAlbumImage = track.album.images.reduce(
            (biggest, image) => {
              if (image.height > biggest.height) return image
              return biggest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: biggestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])







  return (
    <div className="flex flex-col h-screen">





      <div className="flex justify-center items-center bg-gray-100">
        <div className="mx-10">
          <h3 className="text-6xl font-bold font-mono bg-gradient-to-r from-blue-400 to-blue-400 text-transparent bg-clip-text" id="logo">Namify</h3>
        </div>
        <div className="inline-block w-1/2 mx-auto mt-8 mx-15" style={{ marginLeft: "265px", position: "relative", bottom: 13 }}>
          <div className="flex items-center border border-gray-300 rounded px-4 py-2 w-80 bg-white">
            <input
              className="flex-grow outline-none pr-4 text-lg font-semibold text-gray-700"
              type="text"
              placeholder="Search for something..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

          </div>
        </div>
        <div className="flex items-center bg-gray-400  p-2 h-14 ml-auto rounded-lg" id="profile">

          <img src={userPhoto} className="object-contain  mr-4" style={{ maxWidth: "100%", maxHeight: "100%" , height:"60px",width:"60px"}}></img>
          <div className="font-bold flex-1 ">{userName}</div>
        </div>

      </div>

      <div className="flex-grow bg-gray-200">
        <div className="flex">

        <div className="border rounded-lg overflow-y-scroll p-2 bg-gray-300 space-y-2" style={{ marginBottom: "150px", height: "582px", marginTop: "10px", marginLeft: "10px", width: 500 }}>
  <div className="flex items-center bg-gray-300 " id="catergory">
    { !playlistState && (
      
      <svg className=" cursor-pointer w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={() => setPlaylistState(true)}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>  
    )}
    <h3 class="font-bold text-center border-b-2 border-gray-500  mx-auto text-2xl">{ playlistState ? 'Playlists:' : playlistName }</h3>
  </div>
  {playlistState ? (
    displayUserPlaylists.map(eachPlaylist => (
      <Playlists playlist={eachPlaylist} getPlaylistsSongs={getPlaylistsSongs} />
    ))
  ) : (
    playlistSongs.map(eachSong => (
      <SearchResults track={eachSong} chooseTrack={chooseTrack} />
    ))
  )}
</div>

<div className="border rounded-lg overflow-y-scroll p-2 bg-gray-300 space-y-2" style={{ marginBottom: "150px", height: "582px", marginTop: "10px", marginRight: "10px", marginLeft: "10px", paddingTop: "25px", width: 500 }}>
  <h3 className="font-bold text-center  mx-auto" style={{ position: "relative",top:"10px ",right:"43px",bottom:"40px",marginBottom:"26px" }}>
    <span className="border-b-2 border-gray-500 text-2xl inline-block " style={{ position: "absolute", bottom: "-0.4em" }}>Search:</span>
  </h3>
  {searchResults.map(track => (
    <SearchResults track={track} key={track.uri} chooseTrack={chooseTrack} />
  ))}
</div>

          <div className="border rounded-lg overflow-y-scroll p-2 bg-gray-300 space-y-2" style={{ marginBottom: "150px", height: "582px", marginTop: "10px", marginRight: "10px", width: 500 }}>
          <h3 className="font-bold text-center pb-2 mx-auto">
            <span className="border-b-2 border-gray-500 pb-4 text-2xl">Recommendation:</span>
            </h3>
            {/* Render contents of the new container here */}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );



}

