import "../theme.css";
import React from "react";
import { IpcRenderer, IpcMessageEvent } from "electron";
const $ = require('jquery');
const electron = window.require("electron");

let ipcRenderer: IpcRenderer = electron.ipcRenderer;
var baseTime: any;

export default function App() {
    ipcRenderer.on("metaresponse", (event: IpcMessageEvent, args: any) => {
        var toroth: string = args.title
        var re = /throttled/gi;
        if (toroth.search(re) !== -1) {
            var finalSplit = toroth.split("=")
            try {

                switch (finalSplit[1]) {
                    case "0x0": {
                        console.log("0x0")
                        $(".stateVal").text("normal");
                        break;
                    }
                    case "0x1": {
                        $(".stateVal").text("UNDERVOLTED");
                        break;
                    }
                    case "0x2": {
                        $(".stateVal").text("CAPPED");
                        break;
                    }
                    case "0x4": {
                        $(".stateVal").text("THROTTLED");
                        break;
                    }
                    case "0x10000": {
                        $(".stateVal").text("UNDERVOLTED");
                        break;
                    }
                    case "0x20000": {
                        $(".stateVal").text("CAPPED");
                        break;
                    }
                    case "0x40000": {
                        $(".stateVal").text("THROTTLED");
                        break;
                    }
                    default: {

                        $(".stateVal").text("Normal");
                        $(".stateVal").addClass("text-success");
                        break;
                    }
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            var loadSplit = toroth.split(" ")
            if (loadSplit[11]) {
                $(".loadinfo").text(`${loadSplit[13].replace(",", "")}::${loadSplit[14].replace(",", "")}::${loadSplit[15]}`);

            } else {

                baseTime = toroth
            }
        }
    });

    function meta() {
        ipcRenderer.send('meta', { ask: "/opt/vc/bin/vcgencmd get_throttled" })
        setTimeout(meta, 5000);
    }
    function load() {
        ipcRenderer.send('meta', { ask: "uptime" })
        setTimeout(load, 5000);
    }
    ipcRenderer.send('meta', { ask: "uptime -s" })
    function Uptime() {
        var time = +new Date() - +new Date(baseTime)
        var date = new Date(time);
        var d = date.getDay();
        var h = date.getHours();
        var m = date.getMinutes();

        $(".uptimeDef").text(`D:${d} H:${h} M:${m}`);
        setTimeout(Uptime, 2000);
    }
    Uptime()
    load()
    meta()
    return (
        <div>
            <div className="bg-primary-dark rounded">
                <p className="p-2 text-dark">Power State: <span className="stateVal">?</span></p>
            </div>
            <div className="bg-primary-dark rounded">
                <p className="p-2 text-dark">Uptime: <span className=" secondary-light uptimeDef">?</span></p>
            </div>
            <div className="bg-primary-dark rounded">
                <p className="p-2 text-dark">Load: <span className="secondary-light loadinfo">?</span></p>
            </div>
        </div>
    );

}