import { ReactFuri } from "react-furi";
import SongData from "./SongData.json";
import React from "react";

const LyricsLine = (props) => {
  const audioRef = React.useRef(props.audioRef.current);
  let keyPress = new Audio();

  const onLineClicked = (startMillisecond) => {
    // Nudge value to fix floating-point issue
    audioRef.current.currentTime = (startMillisecond + 1) / 1000;
    props.recoverAutoScrollImmediately();
    keyPress.src = "./assets/audios/keypress.mp3";
    keyPress.volume = props.uiVolume;
    keyPress.play();
  }

  return <div
    style={{
      opacity: ".85",
      backgroundColor: props.active
        ? SongData[props.songIndex].lineColor
        : `transparent`,
      padding: `10px`,
      color: props.active ? SongData[props.songIndex].backgroundColor : `white`,
      fontWeight: props.active ? "500" : "normal",
      borderRadius: props.active ? "5px" : "0px",
    }}
    onClick={() => onLineClicked(props.startMillisecond)}
  >
    {
      (props.children[0].content !== props.children[1]?.content)
        ? props.children.map((child, i) => (
          <div
            key={child.id}
          >
            {i === 2 ? null : i === 0 ? <ReactFuri word={props.children[0].content} reading={props.children[2].content} /> : <div>{child.content}</div>}
          </div>
        ))
        : props.children[0].content
    }
  </div>
};

export default LyricsLine;