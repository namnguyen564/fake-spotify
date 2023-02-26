import React from "react";

export default function SearchResults({track}){

    return (
        <div>
            <img src ={track.albumUrl}></img>
            <div>
                <div>{track.title}</div>
                <div>{track.artist}</div>
            </div>
        </div>



    )
}