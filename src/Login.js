import React from "react"

// Authorisation URL which redirects user to Spotifys login page
const authorisation_url = 
"https://accounts.spotify.com/authorize?client_id=c08f355b3fe744f8ae7bb97dc1de955b&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login(){
    return (
        <div class="flex flex-col h-screen">
        <div class="flex flex-row">
          <div class="flex flex-col w-1/2">
          <h3 class="text-6xl font-bold font-mono bg-gradient-to-r from-blue-400 to-blue-400 text-transparent bg-clip-text ml-10 mt-10" id="logo">Namify</h3>
          <h3 class="text-7xl font-bold bg-gradient-to-r from-gray-500 to-black text-transparent bg-clip-text ml-10 mt-20" id="subText">Your Personalised</h3>
<h3 class="text-7xl font-bold bg-gradient-to-r from-gray-500 to-black text-transparent bg-clip-text ml-10 mt-20" id="subText">Music Service</h3>


            <h3 class="text-4xl font-bold font-mono text-white ml-10 mt-10" id="subText" >For All Music Listeners</h3>
            
            <a href={authorisation_url} class="bg-gray-600 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-400 w-1/4 ml-10 mt-10 text-xl" id="button">Login</a>
          </div>
          
          <div class="w-1/2 h-screen">
            <img src="https://images.immediate.co.uk/production/volatile/sites/3/2022/03/rick-and-morty-5bc162c.jpg?quality=90&resize=980,654" alt="Image" class="w-full h-full object-cover" ></img>
          </div>
        </div>
      </div>
    )
}