import React from "react";

const Clock = (props) => {
  const [hour, setHour] = React.useState("00");
  const [minute, setMinute] = React.useState("0");
  const [mainSize, setMainSize] = React.useState(8);
  const [secondSize, setSecondSize] = React.useState(1.875);
  const [second, setSecond] = React.useState("");
  React.useEffect(() => {
    setInterval(() => {
      let currentTime = new Date();
      setHour(currentTime.getHours());
      setMinute(currentTime.getMinutes());
      setSecond(currentTime.getSeconds());
    }, 1000);
  }, []);

  React.useLayoutEffect(() => {
    const updateSize = () => {
      if (window.innerWidth <= 1370) {
        setMainSize(4.5);
        setSecondSize(1.75);
      } else {
        setMainSize(8);
        setSecondSize(1.875);
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <p
      className={`p-8 leading-none absolute opacity-80 overflow-visible`}
      style={{
        fontSize: `${mainSize * props.textSize}rem`,
        top: "79vh",
        right: "2vw",
        color: `white`
      }}
    >
      {hour + ":"}
      {minute > 9 ? minute : "0" + minute}
      <span
        className={`absolute bottom-[2.5vh]`}
        style={{
          fontSize: `${secondSize * props.textSize}rem`,
          color: `white`,
        }}
      >
        {second > 9 ? second : "0" + second}
      </span>
    </p>
  );
};

export default Clock;
