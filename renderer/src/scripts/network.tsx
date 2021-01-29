import "../theme.css";
import readStats from "./praseNetwork";
import React, { useEffect } from "react";
import { IpcRenderer, IpcMessageEvent } from "electron";
import prettyBytes from 'pretty-bytes';

const $ = require('jquery');
const Chart = require('chart.js');
const electron = window.require("electron");

let ipcRenderer: IpcRenderer = electron.ipcRenderer;
var baseNetworkR: any;
var baseNetworkT: any;


function convertNetwork(Ninput: any) {
    switch (Ninput[1]) {
        case "kB": {
            return (Ninput[0] * 10 ** 3)
        }
        case "mB": {
            return (Ninput[0] * 10 ** 6)
        }
        case "gB": {
            return (Ninput[0] * 10 ** 9)
        }
        case "B": {
            return Ninput[0]
        }
    }
}

export default function App() {
    useEffect(() => {
        const ctx = document.getElementById("myNet");
        var networkChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["0"],
                datasets: [
                    {
                        label: "",
                        data: [],
                        backgroundColor: "#00ff5e6f",
                        borderColor: "#00ff5ec7",
                        borderWidth: 1
                    },
                    {
                        label: "",
                        data: [],
                        backgroundColor: "#fe1930",
                        borderColor: "#fe19308d",

                        borderDash: [5, 3]
                    }
                ],
            }

        });
        ipcRenderer.on("networkresponse", (event: IpcMessageEvent, args: any) => {
            var rawList: any = (readStats(args.title))
            if (networkChart.data.datasets[0].data.length === 40) {
                networkChart.data.datasets[0].data.shift()
                networkChart.data.datasets[1].data.shift()

            } else {
                if (networkChart.data.labels.length === 1 && networkChart.data.datasets[0].data.length === 0) {
                    console.log()
                } else {
                    networkChart.data.labels.push(" ")
                }

            }

            if (!baseNetworkR) {
                baseNetworkR = rawList["eth0:"]["rx"]["bytes"]
                baseNetworkT = rawList["eth0:"]["tx"]["bytes"]
            }

            var newrecv = rawList["eth0:"]["rx"]["bytes"] - baseNetworkR
            var newtrcv = rawList["eth0:"]["tx"]["bytes"] - baseNetworkT

            var recv: any = (prettyBytes(Number(newrecv)));
            recv = recv.split(/ /)
            var trcv: any = (prettyBytes(Number(newtrcv)));
            trcv = trcv.split(/ /)

            $(".Uppers").text(prettyBytes(Number(newtrcv)));
            $(".Downl").text(prettyBytes(Number(newrecv)));
            networkChart.data.datasets[0].data.push(convertNetwork(recv))
            networkChart.data.datasets[1].data.push(convertNetwork(trcv))
            networkChart.update();

            baseNetworkR = rawList["eth0:"]["rx"]["bytes"]
            baseNetworkT = rawList["eth0:"]["tx"]["bytes"]

        })

    });
    function foo() {
        ipcRenderer.send('network', { ask: "cat /proc/net/dev" })
        setTimeout(foo, 2000);
    }
    foo()

    return (
        <div className="bg-primary-dark rounded-top">
            <canvas id="myNet" width="400" height="200" />
        </div>
    );
}