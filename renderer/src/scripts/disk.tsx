import "../theme.css";
import React, { useEffect } from "react";
import { IpcRenderer, IpcMessageEvent } from "electron";
const Chart = require('chart.js');
const $ = require('jquery');
const electron = window.require("electron");

let ipcRenderer: IpcRenderer = electron.ipcRenderer;

export default function App() {
    useEffect(() => {
        const ctx = document.getElementById("myDisk");
        var diskNut = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["USED", "AVAILABLE"],
                datasets: [
                    {
                        label: "",
                        data: [54, 6.6],
                        backgroundColor: ["#6e3fca7e", "#44277f7e"],
                        borderColor: ["#6e3fca7e", "#44277f7e"],
                        borderWidth: 2,
                        hoverOffset: 4,
                        weight: 3
                    }
                ],
            }

        });
        ipcRenderer.on("diskresponse", (event: IpcMessageEvent, args: any) => {
            var baseArgs = (args.title.split(/\r?\n/))
            baseArgs.forEach((element: { split: (arg0: RegExp) => any; }) => {
                var parts = element.split(/ /)
                parts = parts.filter(function (e: string) { return e.replace(/(\r\n|\n|\r)/gm, "") });
                if (parts[0] === "/dev/root") {

                    diskNut.data.datasets[0].data = []

                    $(".diskPer").text(parts[2]);
                    diskNut.data.datasets[0].data.push(parts[2].replace(/G|K|M|T/, ''))
                    diskNut.data.datasets[0].data.push(parts[1].replace(/G|K|M|T/, ''))
                    diskNut.update();
                }

            });
        });
    });

    ipcRenderer.send('disk', { ask: "df -H" })

    return (
        <div className="bg-primary-dark rounded">
            <canvas id="myDisk" className="p-2"  width="400" height="256"/>
        </div>
    );
}