export default function readStats(contents: any) {
    var stats: any = {
    };

    let lines: any = contents.split(/\r?\n/);
    lines.forEach((element: { split: (arg0: RegExp) => any; }) => {
        var parts = element.split(/ /)
        parts = parts.filter(function (e: string) { return e.replace(/(\r\n|\n|\r)/gm, "") });
        if (parts[0] !== "Inter-|" && parts[0] !== "face") {
            var ifaceStats = {
                rx: {
                    bytes: parts[1],
                    packets: parts[2],
                    errors: parts[3],
                    drop: parts[4],
                    fifo: parts[5],
                    frame: parts[6],
                    compressed: parts[7],
                    multicast: parts[8],
                },
                tx: {
                    bytes: parts[9],
                    packets: parts[10],
                    errors: parts[11],
                    drop: parts[12],
                    fifo: parts[13],
                    cols: parts[14],
                    carrier: parts[15],
                    compressed: parts[16],
                },
            };
            stats[parts[0]] = ifaceStats;
        }

    });
    return stats;
}

