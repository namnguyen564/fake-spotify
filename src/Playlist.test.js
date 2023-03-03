import {render,screen,fireEvent,waitFor} from "@testing-library/react"
import Playlist from "./Playlists"

test("Playlists are displayed", () => {
    const fakeData = {
        playlistImage: "sdasd",
        playlistName: "sdsd"
    }

    render (
        <Playlist playlist={fakeData}></Playlist>
    )

    expect(screen.getByText(fakeData.playlistName)).not.toBeNull()
    // expect(screen.getByText(fakeData.title)).not.toBeNull()
})