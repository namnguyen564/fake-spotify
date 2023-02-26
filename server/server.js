const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const SpotifyWebApi = require('spotify-web-api-node')

const app = express()
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.use(bodyParser.json())

app.get('/test',(req,res) =>{
    res.json({ message: "hello" });
})


app.post('/refresh', (req,res) => {
   
    const refreshToken = req.body.refreshToken
    console.log(refreshToken)

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'c08f355b3fe744f8ae7bb97dc1de955b',
        clientSecret: '4eeded8fb69149c7b36e7280752b8ccb',
        refreshToken,
    })

    spotifyApi
    .refreshAccessToken()
    .then(data => {
          console.log(data.body);
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn
            })
          // Save the access token so that it's used in future calls
        //   spotifyApi.setAccessToken(data.body['access_token']);
        })
        
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
    
})

app.post('/login', (req, res) => {
    // console.log(req.body)
    console.log("smh")
    const code = req.body.code;
   

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'c08f355b3fe744f8ae7bb97dc1de955b',
        clientSecret: '4eeded8fb69149c7b36e7280752b8ccb'
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch((err)=>{
        console.log(err)
        res.sendStatus(400)
    })
})

app.listen(3001)