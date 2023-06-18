import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import Editor from "@monaco-editor/react"
import * as Y from "yjs"
// import { WebrtcProvider } from "y-webrtc"
import { WebsocketProvider } from 'y-websocket'
import { MonacoBinding } from "y-monaco"
// import ws from 'ws';
// import dotenv from "dotenv";

// dotenv.config()
// console.log(process.env)

function App() {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    const doc = new Y.Doc();

    // const provider = new WebsocketProvider('ws://localhost:1234', 'new-room', doc)
    const provider = new WebsocketProvider('wss://server.landzbergs.com', 'my-roomname', doc)
        // const provider = new WebrtcProvider("test-room", doc)
    const type = doc.getText("monaco");
    const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness)
    console.log("provider awareness", provider.awareness)
  }

  return (
    <Editor 
    height="100vh"
    width="100vw"
    theme="vs-dark"
    onMount={handleEditorDidMount}
    />
  )
}

export default App
