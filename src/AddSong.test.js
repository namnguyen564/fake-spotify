import {render,screen,fireEvent} from "@testing-library/react"

import AddSong from "./AddSong"


test("song is being added", () => {
    const fakeData = {
        image: "idk again",
        name: "asdasd",
        artist: "dsada"
    }

    render (
        <AddSong song={fakeData}></AddSong>
    )
    expect(screen.getByText(fakeData.artist)).not.toBeNull()
    expect(screen.getByText(fakeData.name)).not.toBeNull()

}) 