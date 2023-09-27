import React, { useState, useEffect } from "react";

function TypingAnimation({ text }) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval;
    const animateText = () => {
      interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText((prevText) => prevText + text.charAt(index));
          setIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(interval);
          // After displaying the entire text, reset the animation
          setTimeout(() => {
            setDisplayText("");
            setIndex(0);
          }, 1000); // Adjust the delay (in milliseconds) before restarting
        }
      }, 500); // Adjust the animation speed (milliseconds per character)
    };

    animateText(); // Start the animation

    return () => clearInterval(interval); // Cleanup on unmount
  }, [index, text]);

  return <span>{displayText}</span>;
}

export default TypingAnimation;
