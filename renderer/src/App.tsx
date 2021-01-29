import React from "react";
import CenteredGrid from "./overview";
import 'bootstrap/dist/css/bootstrap.min.css';
import { IpcRenderer, IpcMessageEvent } from "electron";
const electron = window.require("electron");

let ipcRenderer: IpcRenderer = electron.ipcRenderer;

ipcRenderer.on("presppon", (event: IpcMessageEvent, args: any) => {
  console.log("App:", args);
});

const App: React.FC = () => {
  return (
    <div className="App">
      <CenteredGrid />
    </div>
  );
};

export default App;

/* <button onClick={e=>ipcRenderer.send('channel' , {title : 'hi' , content : 'hello this is my message'})} >
  Click me
</button> */
