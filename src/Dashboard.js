import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node"
import SearchResults from "./SearchResults";
import ArtistSearchResults from "./ArtistSearchResults";
import Player from "./Player"
import Playlists from "./Playlists";
import AddSong from "./AddSong";
import AddArtist from "./AddArtist";
import Recommendations from "./Recommendations"

const spotifyApi = new SpotifyWebApi({
  clientId: 'c08f355b3fe744f8ae7bb97dc1de955b',
})



export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSongsSearchResults] = useState([])
  const [searchArtistsResults, setArtistsSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState("")
  const [userName, setName] = useState()
  const [userPhoto, setUserPhoto] = useState("")
  const [userId, setUserId] = useState("")
  const [displayUserPlaylists, setUserPlaylists] = useState([])
  const [playlistState, setPlaylistState] = useState(true)
  const [playlistSongs, setDisplayPlayListSongs] = useState([])
  const [playlistName, setPlaylistName] = useState("")
  const [currentSearchChoice, setCurrentSearchChoice] = useState("songs")
  const [songList, setSongList] = useState([])
  const [artistList, setArtistList] = useState([])
  const [recommendations, setRecommendation] = useState([])
  const [recommendationState, setRecommendationState] = useState(true)
  const [currentRecommendationLength , setCurrentRecommendationLength] = useState(0)




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
            albumUrl: eachSong.track.album.images[0].url,
            id: eachSong.track.id
            // albumUrl: biggestAlbumImage.url,
          }
        })
        )
      }, function (err) {
        console.log('Something went wrong!', err);
      });
  }



  function getRecommendations() {
    const artistListArray = artistList.map(artist => artist.id);
    const songListArray = songList.map(song => song.id);

    setRecommendationState(false)
    spotifyApi.getRecommendations({
      min_energy: 0.4,
      seed_artists: [artistListArray],
      seed_tracks: [songListArray],
      min_popularity: 50
    })
      .then(function (data) {
        let recommendations = data.body;
        console.log(recommendations);


        setRecommendation(data.body.tracks.map(eachSong => {


          return {
            artist: eachSong.artists[0].name,
            title: eachSong.name,
            uri: eachSong.uri,
            albumUrl: eachSong.album.images[0].url
            // albumUrl: biggestAlbumImage.url,
          }
        }))
      }, function (err) {
        console.log("Something went wrong!", err);
      });

  }



  // Searching for Songs
  useEffect(() => {
    console.log("searching Songs")
    if (!search) return setSongsSearchResults([])
    if (!accessToken) return

    console.log(accessToken)
    let cancel = false
    spotifyApi.searchTracks(search).then(res => {

      console.log(res.body.tracks.items)
      if (cancel) return
      setSongsSearchResults(

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
            id: track.id
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])


  //Searching for Artists

  useEffect(() => {

    if (!search) return setArtistsSearchResults([])
    if (!accessToken) return
    if (currentSearchChoice == "songs") return

    console.log(accessToken)
    let cancel = false
    spotifyApi.searchArtists(search).then(res => {

      console.log('Search artists', res.body);
      if (cancel) return
      setArtistsSearchResults(

        res.body.artists.items.map(artist => {
          const biggestArtistImage = artist.images.reduce(
            (biggest, image) => {
              if (image.height > biggest.height) return image
              return biggest
            },

            artist.images[0]
          )

          return {
            artistName: artist.name,
            artistImage: biggestArtistImage.url,
            artistId: artist.id
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken, currentSearchChoice])




  const handleSwitchToggle = () => {
    console.log(recommendationState)
    if (currentSearchChoice === "songs") {
      setCurrentSearchChoice("artists");
    } else {
      setCurrentSearchChoice("songs");
    }
  };


  function addSong(song) {
    console.log(song)
    console.log("tryna add song")
    
    setSongList([...songList, { id: song.id, name: song.title,artist: song.artist, image: song.albumUrl }]);
    console.log(songList)
    console.log(currentRecommendationLength)

  }

  function addArtist(artist) {
    console.log(artist)
    
    // let trackId = song.uri.substring(song.uri.indexOf("track:") + 6);
    console.log("tryna add artist")
    setArtistList([...artistList, { id: artist.artistId, artistName: artist.artistName, artistImage: artist.artistImage }]);
    // setSongList([...artistList, { id: trackId, name: song.title }]);
    console.log(artistList)

  }

  function removeSong(index) {
    setSongList(prevSongList => prevSongList.filter((_, i) => i !== index));
  }

  function removeArtist(index) {
    setArtistList(prevArtistList => prevArtistList.filter((_, i) => i !== index));
  }

  useEffect(() => {
    setCurrentRecommendationLength(songList.length + artistList.length);
  }, [songList, artistList]);


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

        <label class="inline-flex items-center"style={{paddingRight:"340px",paddingTop:"6px"}}>
  <input type="checkbox" class="form-checkbox h-5 w-5 text-indigo-600" onClick={handleSwitchToggle} />
  <span class="ml-2 text-gray-700 font-bold">{currentSearchChoice === "songs" ? "Search Artists" : "Search Artists"}</span>
</label>
          
        {/* <div className="flex items-center bg-gray-400  p-2 h-14 rounded-lg" id="profile"> */}

          <img src={userPhoto} className="object-contain  mr-4" id="userphoto"style={{ maxWidth: "100%", maxHeight: "100%", height: "60px", width: "60px" }}></img>
          <div className="font-bold  " id="username">{userName}</div>
        {/* </div> */}

      </div>

      <div className="flex-grow bg-gray-200">
        <div className="flex">

          <div className="border rounded-lg overflow-y-scroll p-2 bg-gray-300 space-y-2" style={{ marginBottom: "150px", height: "582px", marginTop: "10px", marginLeft: "10px", width: 500 }}>
            <div className="flex items-center bg-gray-300 " id="catergory">
              {!playlistState && (

                <svg className=" cursor-pointer w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={() => setPlaylistState(true)}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              )}
              <h3 class="font-bold text-center border-b-2 border-gray-500  mx-auto text-2xl">{playlistState ? 'Playlists:' : playlistName}</h3>
            </div>
            {playlistState ? (
              displayUserPlaylists.map(eachPlaylist => (
                <Playlists playlist={eachPlaylist} getPlaylistsSongs={getPlaylistsSongs} addSong={addSong} />
              ))
            ) : (
              playlistSongs.map(eachSong => (
                <SearchResults track={eachSong} chooseTrack={chooseTrack} addSong={addSong} currentRecommendationLength={currentRecommendationLength} />
              ))
            )}
          </div>

          <div className="border rounded-lg overflow-y-scroll p-2 bg-gray-300 space-y-2" style={{ marginBottom: "150px", height: "582px", marginTop: "10px", marginRight: "10px", marginLeft: "10px", paddingTop: "25px", width: 500 }}>
            
            <h3 className="font-bold text-center  mx-auto" style={{ position: "relative", top: "10px ", right: "43px", bottom: "40px", marginBottom: "26px" }}>
              
              <span className="border-b-2 border-gray-500 text-2xl inline-block " style={{ position: "absolute", bottom: "-0.4em" }}>Search:</span>
            </h3>

            {currentSearchChoice === "songs" && searchResults.map(track => (
              <SearchResults track={track}  chooseTrack={chooseTrack} addSong={addSong} currentRecommendationLength={currentRecommendationLength} />
            ))}
            {currentSearchChoice === "artists" && searchArtistsResults.map(artist => (
              <ArtistSearchResults artist={artist} addArtist={addArtist} />
            ))}



          </div>

          <div className="border rounded-lg overflow-y-scroll p-2 bg-gray-300 flex flex-col relative" style={{ marginBottom: "150px", height: "582px", marginTop: "10px", marginRight: "10px", width: 500 }}>

  <div className="flex items-center bg-gray-300 " id="catergory">
    {!recommendationState && (
      <svg className=" cursor-pointer w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={() => setRecommendationState(true)}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    )}
    <h3 class="font-bold text-center border-b-2 border-gray-500  mx-auto text-2xl">{recommendationState ? 'Recommendation:' : "Your Recommendation"}</h3>
  </div>

  {recommendationState ? (
    <div className="flex-grow">
      <h3 className="font-bold text-center pb-2 mx-auto"></h3>
      {songList.map((song, index) => (
  <AddSong key={index} song={song} chooseTrack={chooseTrack}  removeSong={() => removeSong(index)} />
))}
      {artistList.map((artist,index) => (
        <AddArtist key={index} artist={artist} removeArtist={() => removeArtist(index)}/>
      ))}
      
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded absolute bottom-0" style={{ marginLeft: "130px", marginBottom: "28px" }} onClick={getRecommendations} >
  Get Recommendation
</button>
    </div>
  ) : (
    
    recommendations.map(eachSong => (
      <Recommendations style={{ paddingTop: "40px" }} song={eachSong} chooseTrack={chooseTrack} addSong={addSong} />
    ))
    
  )}

 

</div>






        </div>




      </div>



      <div className="fixed bottom-0 w-full">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </div>
  );


}

