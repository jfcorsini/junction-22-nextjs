import React, { useEffect, useRef } from 'react';
import { Box, Container, Text } from '@chakra-ui/react';
// import { highlight, languages } from 'prismjs/components/prism-core';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/themes/prism.css'; //Example style, you can use another

//@ts-ignore Library doesn't have types
import { TitleBar } from 'react-desktop/windows';
import Editor from 'react-simple-code-editor';
//@ts-ignore Library doesn't have types
import { Scrollbars } from 'react-custom-scrollbars';
import { mockData } from '../../utils/mock';
import { getDailyText } from '../../utils/terminal';
import { useEffectOnce } from '../../utils/hooks';

const TOTAL_TIME_MS = 4000;

const Terminal = () => {
  const scrollRef = useRef()
  const [mockNumber, setMockNumber] = React.useState(0);
  const [text, setText] = React.useState("");
  const [charNum, setCharNum] = React.useState(0);

  const updateText = React.useCallback(() => {
    setMockNumber((prev) => prev + 1);
    const oldText = text;
    const nextText = `${oldText}\n${getDailyText(mockData[mockNumber % mockData.length])}`
    setText(nextText);
    setCharNum(oldText.length);
  }, [mockNumber, text]);

  useEffectOnce(() => {
    updateText()
  });

  // Read a new day
  useEffect(() => {
    const interval = setInterval(() => {
      updateText();
    }, TOTAL_TIME_MS);
    return () => clearInterval(interval);
  }, [updateText]);

  // Update typed text
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCharNum(Math.min(text.length, charNum + 30));

      if (scrollRef.current) {
        //@ts-ignore Bad types...
        scrollRef.current.scrollToBottom();
      }
    }, 20);

    return () => clearTimeout(timeout);
  }, [charNum, text.length]);


  return (
    <Container
      height="full"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      overflow="scroll"
      >
      <TitleBar controls theme="dark" title="Black Box" />
      <Scrollbars ref={scrollRef} style={{ height: 600 }}>

        <Editor
          value={text.slice(0, charNum)}
          onValueChange={() => null}
          highlight={code => code}
          padding={10}
          // highlight={code => highlight(code, languages.js)} 
          style={{
            backgroundColor: '#222',
            width: "100%",
            fontFamily: '"Fira code", "Fira Mono", monospace',
            color: '#fff',
            fontSize: 16,
            minHeight: 600,
          }}
        />
        </Scrollbars>
    </Container>
  )
}

export default Terminal
