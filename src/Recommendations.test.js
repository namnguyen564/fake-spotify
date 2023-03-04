import {render,screen,fireEvent,waitFor} from "@testing-library/react"
import Recommendations from "./Recommendations"

test("Recommendations displays", () => {
    const fakeData = {
        title: "idk",
        artist: "idk again",
        albumUrl: "sadadkj"
    }

    render (
        <Recommendations song={fakeData}></Recommendations>
    )

    expect(screen.getByText(fakeData.artist)).not.toBeNull()
    expect(screen.getByText(fakeData.title)).not.toBeNull()
})

