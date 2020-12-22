import React, { useEffect, useState, createRef } from "react";
import styled from "styled-components";

const StyledProgress = styled.div`
  .circular-chart {
        display: block;
        margin: 20px auto;
        max-width: 100%;
        max-height: 250px;
    }
    .circular-bg {
        fill: none;
    }
    .circle {
        fill: none;
    }
    .percentage {
        font-size: 1.3rem;
        text-anchor: middle;
        fill: #fff;
        font-weight: bold;
    }
`

const Timer = (props, { time, onTimeIsUp }) => {
  const [seconds, setSeconds] = useState(time || 50);
  const [progress, setProgress] = useState(20);
  const userTime = createRef(null);
  const [offset, setOffset] = useState(0);

  const {
    size,
    strokeWidth,
    circleOneStroke,
    circleTwoStroke,
    } = props;

    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
      setProgress(seconds)
    }, [])

    useEffect(() => {
        const progressOffset = ((progress - seconds) / progress) * circumference;
        setOffset(progressOffset);
    }, [setOffset, progress, circumference, offset, seconds]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userTimeElement = userTime.current;
    setSeconds(userTimeElement.value);
    userTimeElement.value = "";
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (seconds >= 1) {
        setSeconds((seconds) => seconds - 1);
      } else if (seconds === 0) {
        // changed onTimeIsUp prop to alert() to avoid error compilation
        alert("time is up!");
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <StyledProgress>
     <svg
                className="circular-chart"
                width={size}
                height={size}
            >
                <circle
                    className="circular-bg"
                    stroke={circleOneStroke}
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                ></circle>
                <circle
                    className="circle"
                    stroke={circleTwoStroke}
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                >
                </circle>
                <text
                    x={center}
                    y={center}
                    className="percentage"
                >
                    {seconds}%
                </text>
            </svg>
      <div>
        <span className="label">
          <span className="timer-seconds">{progress}</span><span className="smaller">'s remaining!</span>
        </span>
      </div>
    
  </StyledProgress>
  );
};

export default Timer;
