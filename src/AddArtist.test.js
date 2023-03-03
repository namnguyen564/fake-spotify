import {render,screen,fireEvent} from "@testing-library/react"

import AddArtist from "./AddArtist"


test("artist is being added", () => {
    const fakeData = {
        artistName: "idk again",
        // artistImage: "sadadkj"
    }

    render (
        <AddArtist artist={fakeData}></AddArtist>
    )
    expect(screen.getByText(fakeData.artistName)).not.toBeNull()
    // expect(screen.getByText(fakeData.artistImage)).not.toBeNull()
}) 