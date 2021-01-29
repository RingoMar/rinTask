import "../theme.css";
import React, { useEffect } from "react";
import { IpcRenderer, IpcMessageEvent } from "electron";

const $ = require('jquery');
const Chart = require('chart.js');
const electron = window.require("electron");

let ipcRenderer: IpcRenderer = electron.ipcRenderer;

export default function App() {
    useEffect(() => {
        const ctx = document.getElementById("myCPU");
        var cpuChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["0"],
                borderColor: "Blue",
                datasets: [
                    {
                        label: "",
                        data: [],
                        backgroundColor: "#3211ec3d",
                        borderWidth: 1,
                        borderColor: "#28AFFA",
                        pointBackgroundColor: "#19283F",
                        pointBorderColor: "#28AFFA",
                        pointHighlightFill: "#19283F",
                        pointHighlightStroke: "#28AFFA",
                    }
                ],

                ooptions: {
                    responsive: true,
                    legend: {
                        position: 'bottom',
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Month'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                steps: 10,
                                stepValue: 5,
                                max: 100
                            }
                        }]
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Line Chart - Legend'
                    }
                }
            }

        });
        const ctxM = document.getElementById("myMem");
        var cpuMem = new Chart(ctxM, {
            type: "line",
            data: {
                labels: ["0"],
                borderColor: "Blue",
                datasets: [
                    {
                        label: "",
                        data: [],
                        backgroundColor: "#11ec243d",
                        borderColor: "Green",
                        borderWidth: 1
                    }
                ],

                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                min: 0,
                                stepSize: 1,
                                fontColor: "#fff",
                                fontSize: 14
                            },
                            gridLines: {
                                color: "#fff",
                                lineWidth: 0,
                                zeroLineColor: "#fff",
                                zeroLineWidth: 2
                            },
                            stacked: true
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
                    }
                }
            }

        });

        ipcRenderer.on("topresponse", (event: IpcMessageEvent, args: any) => {
            let deslpit = args.title.split("\n")
            let deslpitagne = deslpit[2].split(",")
            let deslpitmem = deslpit[3].split(",")
            var cpuRaw = (deslpitagne[0].replace("%Cpu(s): ", "").replace(" us", ""));
            var memmraw = (deslpitmem[2].replace(" used", "").split(' ').join(''));
            if (cpuChart.data.datasets[0].data.length === 40) {
                cpuChart.data.datasets[0].data.shift()
                cpuMem.data.datasets[0].data.shift()

            } else {
                if (cpuChart.data.labels.length === 1 && cpuChart.data.datasets[0].data.length === 0) {
                    console.log()
                } else {
                    cpuChart.data.labels.push(" ")
                    cpuMem.data.labels.push(" ")
                }

            }
            cpuChart.data.datasets[0].data.push(cpuRaw)
            cpuChart.update();

            $(".cpuData").text(cpuRaw + " %");

            cpuMem.data.datasets[0].data.push(memmraw)
            cpuMem.update();
            $(".memData").text(memmraw + " MB");
        });
    });

    function foo() {
        ipcRenderer.send('top', { ask: "top -b | head -n 5" })
        setTimeout(foo, 5000);
    }
    foo()

    return (
        <div>
            <div className="bg-primary-dark rounded-top">
                <canvas id="myCPU" width="400" height="200" />
            </div>

            <h6 className="bg-secondary-m bg-secondary-text d-flex font-weight-bold justify-content-around text-dark rounded-bottom">CPU USE <span className="cpuData"></span> </h6>
            <div className="bg-primary-dark rounded-top">
                <canvas id="myMem" width="400" height="200" />
            </div>
            <h6 className="bg-secondary-m bg-secondary-text d-flex font-weight-bold justify-content-around text-dark rounded-bottom">MEMORY USE <span className="memData"></span></h6>
        </div>
    );
}