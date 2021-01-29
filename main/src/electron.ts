import { BrowserWindow, app, ipcMain, IpcMessageEvent } from "electron";
import * as isDev from "electron-is-dev";
import * as path from "path";
const { exec } = require("child_process");

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    maxWidth: 900,
    height: 680,
    darkTheme: true,
    maxHeight: 680,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  
  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => mainWindow.destroy());

  ipcMain.on("comtask", (event: IpcMessageEvent, msg: any) => {
    exec(msg.ask, (error: { message: any; }, stdout: any, stderr: any) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      mainWindow.webContents.send("taskresponse", { title: stdout});
      
    });
  });

  ipcMain.on("network", (event: IpcMessageEvent, msg: any) => {
    exec(msg.ask, (error: { message: any; }, stdout: any, stderr: any) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      mainWindow.webContents.send("networkresponse", { title: stdout});
      
    });
  });

  ipcMain.on("top", (event: IpcMessageEvent, msg: any) => {
    exec(msg.ask, (error: { message: any; }, stdout: any, stderr: any) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      mainWindow.webContents.send("topresponse", { title: stdout});
      
    });
  });

  ipcMain.on("disk", (event: IpcMessageEvent, msg: any) => {
    exec(msg.ask, (error: { message: any; }, stdout: any, stderr: any) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      mainWindow.webContents.send("diskresponse", { title: stdout});
    });
  });

  ipcMain.on("meta", (event: IpcMessageEvent, msg: any) => {
    exec(msg.ask, (error: { message: any; }, stdout: any, stderr: any) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      mainWindow.webContents.send("metaresponse", { title: stdout});
    });
  });

  ipcMain.on("channel", (event: IpcMessageEvent, msg: any) => {
    exec(msg.ask, (error: { message: any; }, stdout: any, stderr: any) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      mainWindow.webContents.send("response", { title: stdout});
    });
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
