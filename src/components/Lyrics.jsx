import React from "react";
import SongData from "./SongData.json";
import { Lrc, useRecoverAutoScrollImmediately } from "react-lrc";

const Lyrics = (props) => {
  const [lyrics, setLyrics] = React.useState("");
  const [currentTime, setCurrentTime] = React.useState(0);
  const { signal, recoverAutoScrollImmediately } = useRecoverAutoScrollImmediately();
  let keyPress = new Audio();

  props.audioRef.current.addEventListener("timeupdate", () => {
    setCurrentTime(props.audioRef.current.currentTime * 1000);
  });

  React.useEffect(() => {
    // ensure current time is zero
    setCurrentTime(0);
    fetch(`./assets/lyrics/${SongData[props.songIndex].filename ?? SongData[props.songIndex].name}.lrc`)
      .then(res => res.text())
      .then(data => setLyrics(data.replace(/\r\n/g, '\n').replace(/\r/g, '\n')))
  }, [props.songIndex])

  const onLineClicked = (startMillisecond) => {
    props.audioRef.current.currentTime = startMillisecond / 1000;
    recoverAutoScrollImmediately();
    keyPress.src = "./assets/audios/keypress.mp3";
    keyPress.volume = props.uiVolume;
    keyPress.play();
  }

  const lineRenderer = React.useCallback(
    ({ active, line: { content, startMillisecond } }) =>
      <div
        style={{
          opacity: ".85",
          backgroundColor: active
            ? SongData[props.songIndex].lineColor
            : `transparent`,
          padding: `10px`,
          color: active ? SongData[props.songIndex].backgroundColor : `white`,
          fontWeight: active ? "500" : "normal",
          borderRadius: active ? "5px" : "0px",
        }}
        onClick={() => onLineClicked(startMillisecond)}
      >
        <p>{content}</p>
      </div>
  )

  return (
    <div
      className="lrc-container"
      style={{ border: `4.5px solid ${SongData[props.songIndex].lineColor}` }}
    >
      <Lrc
        className="lrc"
        lrc={lyrics}
        lineRenderer={lineRenderer}
        currentMillisecond={currentTime}
        recoverAutoScrollSingal={signal}
      />
    </div>
  );
};

export default Lyrics;