const Lyrics = (props) => {
    let lyrics
    fetch("C:\Users\Joseph\Documents\GitHub\Bocchi-Wallpaper\public\assets\lyrics\Planet.lrc")
        .then((res) => res.text())
        .then((text) => {
            lyrics = text
        })
        .catch((e) => console.error(e));
    
    return (
        <div
            className="lyrics"
        >
            {lyrics}
        </div>
    );
}

export default Lyrics;