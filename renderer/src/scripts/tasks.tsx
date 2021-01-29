import "../theme.css";
import React from "react";
import Table from 'react-bootstrap/Table'
import { IpcRenderer, IpcMessageEvent } from "electron";
const electron = window.require("electron");
const $ = require('jquery');

let ipcRenderer: IpcRenderer = electron.ipcRenderer;

export default function App() {
    ipcRenderer.on("taskresponse", (event: IpcMessageEvent, args: any) => {
        $(".innerbody tr").remove();
        var baseArgs = (args.title.split(/\r?\n/))
        baseArgs.forEach((element: { split: (arg0: RegExp) => any; }) => {
            var parts = element.split(/ /)
            parts = parts.filter(function (e: string) { return e.replace(/(\r\n|\n|\r)/gm, "") });
            if (parts[0] !== "USER") {
                $('.innerbody').append(`<tr>
                <td> ${parts[0]}</td>
                <td> ${parts[1]}</td>
                <td> ${parts[2]}</td>
                <td> ${parts[3]}</td>
                <td> ${parts[9]}</td>
                <td><div class="cut">${parts[10]} </div></td>
                </tr>`);
            }

        });
    });

    function foo() {
        ipcRenderer.send('comtask', { ask: "ps aux --sort=-%cpu" })
        setTimeout(foo, 2000);
    }
    foo()

    return (
        <div className="bg-primary-dark overflow-auto p-2 inntertable rounded">
            <Table size="sm"  responsive="sm" striped bordered hover className="rounded" variant="dark">
                <thead>
                    <tr>
                        <th>USER</th>
                        <th>PID</th>
                        <th>%CPU</th>
                        <th>%MEM</th>
                        <th>TIME</th>
                        <th>CMD</th>
                    </tr>
                </thead>
                <tbody className="innerbody">
                </tbody>
            </Table>
        </div>
    );
}