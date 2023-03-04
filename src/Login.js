import React from "react"

// Authorisation URL which redirects user to Spotifys login page
const authorisation_url =
"https://accounts.spotify.com/authorize?client_id=c08f355b3fe744f8ae7bb97dc1de955b&response_type=code&redirect_uri=https://namnguyen564.github.io/namify/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

  

export default function Login() {
  return (
    <div class="flex flex-col h-screen">
      <div class="flex flex-row">
        <div class="flex flex-col w-1/2">
          {/* <h3 class="text-8xl font-extrabold font-mono bg-gradient-to-r from-blue-400 to-blue-400 text-transparent bg-clip-text ml-10 mt-10" id="logo">Namify</h3> */}
          <img src={process.env.PUBLIC_URL + 'My project-1 (6).png'} style={{ height: "200px", width: "490px" }}></img>
          <h3 class="text-7xl font-bold bg-gradient-to-r from-purple-500 to-red-400 text-transparent bg-clip-text ml-10 mt-10" id="subText">Your Personalised</h3>
          <h3 class="text-7xl font-bold bg-gradient-to-r from-purple-500 to-red-400 text-transparent bg-clip-text ml-10 mt-20" id="subText">Music Service</h3>


          <h3 class="text-4xl font-bold font-mono text-white ml-10 mt-10" id="subText" >For All Music Listeners</h3>

          <a href={authorisation_url} class="bg-gray-600 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-400 w-1/4 ml-10 mt-10 text-xl" id="button">Login</a>
        </div>

        <div class="w-1/2 h-screen">
          <img src={process.env.PUBLIC_URL + '/Namify-1 (12).png'} alt="Namify logo" class=" h-full object-cover" />
        </div>
      </div>
    </div>
  )
}