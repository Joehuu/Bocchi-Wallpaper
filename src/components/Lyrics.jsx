import React from "react";
import SongData from "./SongData.json";
import { MultipleLrc, useRecoverAutoScrollImmediately } from "react-lrc";
import { toFilename } from "../helpers";
import LyricsDisplay from "../LyricsDisplay";
import LyricsLine from "./LyricsLine";

const Lyrics = (props) => {
  const [lyrics, setLyrics] = React.useState(["", "", ""]);
  const [currentTime, setCurrentTime] = React.useState(0);
  const { signal, recoverAutoScrollImmediately } = useRecoverAutoScrollImmediately();
  const audioRef = React.useRef(props.audioRef.current);

  React.useEffect(() => {
    const audio = audioRef.current;
    const updateCurrentTime = () => setCurrentTime(audio.currentTime * 1000);
    audio.addEventListener("timeupdate", updateCurrentTime);
    return () => audio.removeEventListener("timeupdate", updateCurrentTime);
  }, [])

  React.useEffect(() => {
    const abortController = new AbortController();
    const newLyrics = ["", "", ""];
    const lrcFetches = [];

    if (props.lyricsDisplay === LyricsDisplay.Both) {
      lrcFetches.push(fetch(`./assets/lyrics/original/${toFilename(SongData[props.songIndex].name)}.lrc`, { signal: abortController.signal }));
      lrcFetches.push(fetch(`./assets/lyrics/romanized/${toFilename(SongData[props.songIndex].name)}.lrc`, { signal: abortController.signal }));
      lrcFetches.push(fetch(`./assets/lyrics/furigana/${toFilename(SongData[props.songIndex].name)}.lrc`, { signal: abortController.signal }));
    }
    else {
      lrcFetches.push(fetch(`./assets/lyrics/${props.lyricsDisplay}/${toFilename(SongData[props.songIndex].name)}.lrc`, { signal: abortController.signal }));
    }

    Promise.all(lrcFetches)
      .then(responses => Promise.all(responses.map(r => r.text())))
      .then(lrcs => {
        lrcs.forEach((lrc, i) => newLyrics[i] = lrc.replace(/\r\n/g, '\n').replace(/\r/g, '\n'));
        setLyrics(newLyrics);
      })
      .catch(function (err) {
        if (err.name !== "AbortError")
          console.error(` Err: ${err}`);
      });
    return () => {
      abortController.abort();
    };
  }, [props.songIndex, props.lyricsDisplay])

  const lineRenderer = ({ active, line: { children, startMillisecond } }) => {
    return <LyricsLine
      children={children}
      active={active}
      audioRef={audioRef}
      recoverAutoScrollSingal={signal}
      startMillisecond={startMillisecond}
      songIndex={props.songIndex}
      recoverAutoScrollImmediately={recoverAutoScrollImmediately}
      uiVolume={props.uiVolume}
    />
  }

  return (
    <div
      className="lrc-container"
      style={{ border: `4.5px solid ${SongData[props.songIndex].lineColor}` }}
    >
      <MultipleLrc
        className="lrc"
        lrcs={lyrics}
        lineRenderer={lineRenderer}
        currentMillisecond={currentTime}
        recoverAutoScrollSingal={signal}
      />
    </div>
  );
};

export default Lyrics;
