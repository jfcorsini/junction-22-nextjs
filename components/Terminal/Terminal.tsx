import React from 'react';
import { Box, Container, Text } from '@chakra-ui/react';
// import { highlight, languages } from 'prismjs/components/prism-core';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/themes/prism.css'; //Example style, you can use another
import { TitleBar } from 'react-desktop/windows';
import Editor from 'react-simple-code-editor';
import { Scrollbars } from 'react-custom-scrollbars';

const Terminal = () => {
  const [content, setContent] = React.useState(
    `
    function add(a, b) {\n  return a + b;\n}
    function add(a, b) {\n  return a + b;\n}
    function add(a, b) {\n  return a + b;\n}
    function add(a, b) {\n  return a + b;\n}
    function add(a, b) {\n  return a + b;\n}
    function add(a, b) {\n  return a + b;\n}
    function add(a, b) {\n  return a + b;\n}
    function add(a, b) {\n  return a + b;\n}
    function add(a, b) {\n  return a + b;\n}
    function add(a, b) {\n  return a + b;\n}
    function add(a, b) {\n  return a + b;\n}
    function add(a, b) {\n  return a + b;\n}
    function add(a, b) {\n  return a + b;\n}
    function add(a, b) {\n  return a + b;\n}
    function add(a, b) {\n  return a + b;\n}
    `
  );

  return (

    <Container
      height="full"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      overflow="scroll"
      >
      <TitleBar controls theme="dark" title="Notes" />
      <Scrollbars style={{ height: 600 }}>

        <Editor
          value={content}
          onValueChange={setContent}
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