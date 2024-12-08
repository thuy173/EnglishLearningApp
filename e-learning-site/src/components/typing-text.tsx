import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

interface TypingProps {
  text: string;
}

const TypingContainer = styled.div`
  display: inline-block;
  font-size: 3.2rem;
  font-weight: bold;
  text-align: center;
  white-space: normal;
  word-break: break-word;
  line-height: 1.5;
  padding-top: 12px;
`;

const TypingComponent: React.FC<TypingProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (index < text.length) {
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, 100);

      return () => clearInterval(interval);
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, 1000);

      return () => clearTimeout(resetTimeout);
    }
  }, [index, text]);

  return <TypingContainer>{displayedText}</TypingContainer>;
};

export default TypingComponent;
