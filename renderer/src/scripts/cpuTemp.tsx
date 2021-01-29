import "../theme.css";
import React, { useEffect } from "react";
import { IpcRenderer, IpcMessageEvent } from "electron";
const $ = require('jquery');
const Chart = require('chart.js');
const electron = window.require("electron");

let ipcRenderer: IpcRenderer = electron.ipcRenderer;

export default function App() {
    useEffect(() => {
        const ctx = document.getElementById("myChart");
        var myLineChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["0"],
                borderColor: "Purple",
                datasets: [
                    {
                        label: "",
                        data: [],
                        fill: "origin",
                        backgroundColor: "#6221b36b",
                        borderColor: "Purple",
                        borderWidth: 1,
                        hoverBorderColor: "#000"
                    },
                ],

                options: {
                    scales: {
                        yAxes: [{
                            display: true,
                            ticks: {
                                suggestedMin: 0,
                                beginAtZero: true   // minimum value will be 0.
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: "#fff",
                                fontSize: 14
                            },
                            gridLines: {
                                color: "#fff",
                                lineWidth: 2
                            }
                        }]
                    },

                    plugins: {
                        filler: {
                            propagate: false
                        }
                    },
                    responsive: true,
                    chartArea: {
                        backgroundColor: '#000'
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Line Chart - Legend'
                    }
                }
            }

        });
        ipcRenderer.on("response", (event: IpcMessageEvent, argbase: any) => {
            var n = argbase.title.search(/temp=/i);
            let args = argbase.title.split("=")
            if (n === 0) {

                var tempraw = (args[1].replace("'C", ""));
                if (myLineChart.data.datasets[0].data.length === 40) {
                    // myLineChart.data.labels = ["0"]
                    myLineChart.data.datasets[0].data.shift()

                } else {
                    if (myLineChart.data.labels.length === 1 && myLineChart.data.datasets[0].data.length === 0) {
                        console.log()
                    } else {
                        myLineChart.data.labels.push(" ")
                    }

                }
                myLineChart.data.datasets[0].data.push(tempraw)
                myLineChart.update();

                $(".tempCPU").text(tempraw + "°C");
            }
        });
    });
    function foo() {
        ipcRenderer.send('channel', { ask: "/opt/vc/bin/vcgencmd measure_temp" })
        setTimeout(foo, 2000);
    }
    foo()

    return (
        <div className="bg-primary-dark rounded-top">
            <canvas id="myChart" width="400" height="200" />
        </div>
    );
}