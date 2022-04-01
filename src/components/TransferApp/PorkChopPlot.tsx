import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

import TransferCalculator from "../../main/libs/transfer-calculator";
import Transfer from "../../main/objects/transfer";
import Porkchop from "../../main/objects/porkchop";
import { linspace } from "../../main/libs/math";

type PorkchopPlotProps = {
    inputs:             PorkchopInputs,
    timeSettings:       TimeSettings, 
    startDate:          number, 
    flightTime:         number, 
    transfer:           Transfer, 
    plotCount:          number, 
    setTransfer:        React.Dispatch<React.SetStateAction<Transfer>>, 
    setCalculating:     React.Dispatch<React.SetStateAction<boolean>>, 
    setPorkProgress:    React.Dispatch<React.SetStateAction<number>>,
    setPlotCount:       React.Dispatch<React.SetStateAction<number>>,
}

function preparePorkchopPlotData(porkchop: Porkchop, timeSettings: TimeSettings): PorkchopPlotData {
    const deltaVs = porkchop.deltaVs;
    const startDates = porkchop.startDates;
    const flightTimes = porkchop.flightTimes;

    const levelscale = 1.1;
    const logLevelscale = Math.log(levelscale);
    const nlevels = 16;

    const minDV  = Math.min(...deltaVs.flat());

    const levels = Array.from(Array(nlevels).keys()).map(i => minDV * (levelscale ** i))
    const logLevels = levels.map(i => Math.log(i) / logLevelscale);

    const logDeltaVs = deltaVs.map(i => i.map(j => Math.log(j) / logLevelscale));
    // const logDeltaVs = deltaVs.map(i => i.map(j => j > levels[levels.length - 1] ? NaN : Math.log(j) / logLevelscale));

    const secondsPerDay = 3600*timeSettings.hoursPerDay;
    const startDays = startDates.map(i => i / secondsPerDay);
    const flightDays = flightTimes.map(i => i / secondsPerDay)

    const tickLabels = levels.map(i => Math.floor(i).toString());

    const bestTransfer = porkchop.bestTransfer;

    const transferStartDay = bestTransfer.startDate / secondsPerDay;
    const transferFlightDay = bestTransfer.flightTime / secondsPerDay;

    return {
        deltaVs,
        startDates,
        flightTimes,
        logDeltaVs,
        startDays,
        flightDays,
        levels,
        logLevels,
        tickLabels,
        bestTransfer,
        transferStartDay,
        transferFlightDay,
    }
}

const porkchopWorker = new Worker(new URL("../../workers/porkchop.worker.ts", import.meta.url));

function PorkchopPlot({inputs, timeSettings, transfer, plotCount, setTransfer, setCalculating, setPorkProgress, setPlotCount}: PorkchopPlotProps) {

    const [plotData, setPlotData]: [PorkchopPlotData, React.Dispatch<React.SetStateAction<PorkchopPlotData>>] = useState({
        deltaVs:            [[0]],
        startDates:         [0],
        flightTimes:        [0],
        logDeltaVs:         [[0]],
        startDays:          [0],
        flightDays:         [0],
        levels:             [0],
        logLevels:          [0],
        tickLabels:         [""],
        bestTransfer:       transfer.data,
        transferStartDay:   0,
        transferFlightDay:  0, 
    })

    const [progress, setProgress] = useState(0.0);

    useEffect(() => {
        setPorkProgress(progress);
    }, [progress]);

    useEffect(() => {
        porkchopWorker.onmessage = (event: MessageEvent<{deltaVs: number[][], index: number, finished: boolean}>) => {
            const {deltaVs, index, finished} = event.data;
            const startDates = linspace(inputs.startDateMin, inputs.startDateMax, inputs.nTimes);
            const flightTimes = linspace(inputs.flightTimeMin, inputs.flightTimeMax, inputs.nTimes);
            setProgress(index / inputs.nTimes);
            if (finished) {
                const pork: IPorkchop = {
                    system:                 inputs.system,
                    startOrbit:             inputs.startOrbit,
                    endOrbit:               inputs.endOrbit,
                    ejectionInsertionType:  inputs.ejectionInsertionType === undefined ? "fastdirect" : inputs.ejectionInsertionType,
                    planeChange:            inputs.planeChange === undefined ? false : inputs.planeChange,
                    matchStartMo:           inputs.matchStartMo === undefined ? true : inputs.matchStartMo,
                    matchEndMo:             inputs.matchEndMo === undefined ? false : inputs.matchEndMo,
                    noInsertionBurn:        inputs.noInsertionBurn === undefined ? false : inputs.noInsertionBurn,
                    deltaVs,               
                    startDates,
                    flightTimes,
                }
                const porkchop = new Porkchop(pork);
                setPlotData(preparePorkchopPlotData(porkchop, timeSettings));
                setTransfer(porkchop.bestTransfer)
                setCalculating(false);
                setPlotCount(plotCount + 1)
                console.log("...Porkchop worker returned new plot data with best transfer.")

            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [porkchopWorker]);

    useEffect(() => {
        if (inputs.nTimes !== 0) {
            console.log('Starting Porkchop worker with new inputs...')
            setCalculating(true);
            setProgress(0.0);
            porkchopWorker
                .postMessage({inputs});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputs]);

    return (
        inputs.nTimes === 0 ?
        <Box width="100%" height="450px" justifyContent="center" textAlign="center" display="flex" flexDirection={"column"}>
        A Porkchop Plot will be generated here.
        </Box> 
        :
        <Fade in={plotCount > 0} timeout={400}>
            <Box>
                <Plot
                    data={[
                        { 
                            z: plotData.logDeltaVs,
                            x: plotData.startDays,
                            y: plotData.flightDays,
                            type: 'contour',
                            colorscale: 'Viridis',
                            reversescale: true,
                            // There seems to be an issue with types for contour plots in react-plotly.js
                            // TS predicts an error, but the following code works
                            // @ts-ignore
                            contours: {
                                start: plotData.logLevels[0]+0.05,
                                end: plotData.logLevels[plotData.logLevels.length-1],
                                size: (plotData.logLevels[plotData.logLevels.length-1] - plotData.logLevels[0]) / plotData.logLevels.length,
                                coloring: "heatmap",
                            },
                            colorbar: {
                                title: 'Δv (m/s)',
                                tickvals: plotData.logLevels,
                                ticktext: plotData.tickLabels,
                            },
                            customdata: plotData.deltaVs,
                            hovertemplate: 'Δv = %{customdata:.2f} m/s<extra></extra>',
                        },
                        {
                            x: [plotData.transferStartDay],
                            y: [plotData.transferFlightDay],
                            type: 'scatter',
                            mode: 'markers',
                            marker: {
                                color:  'black',
                                size:   10,
                                symbol: 'x',
                            },
                            hoverinfo: 'skip',
                        }
                    ]}
                    useResizeHandler
                    style={{ width: '100%', height: '100%' }}
                    layout={{
                        uirevision:     "Porkchop",
                        autosize:       true,
                        margin:         {l: 50, r: 40, b: 40, t: 28},
                        xaxis: {
                            showspikes:     true,
                            spikemode:      'across',
                            spikecolor:     "rgb(200, 200, 200)",
                            spikedash:      'solid',
                            spikethickness: -1,
                            showgrid:       false,
                            title:          "Departure Day #"
                        },
                        yaxis: {
                            showspikes:     true,
                            spikemode:      'across',
                            spikecolor:     "rgb(200, 200, 200)",
                            spikedash:      'solid',
                            spikethickness: -1,
                            showgrid:       false,
                            title:          "Flight Duration (days)"
                        },
                    }}
                    onClick={(eventData: any) => {
                        const newPlotData = Object.assign({}, plotData)
                        newPlotData.transferStartDay = (eventData.points[0].x);
                        newPlotData.transferFlightDay = (eventData.points[0].y);

                        const secPerDay = 3600 * timeSettings.hoursPerDay;
                        const startDate = secPerDay * eventData.points[0].x;
                        const flightTime = secPerDay * eventData.points[0].y;

                        const transferCalculator = new TransferCalculator({
                            system:                 inputs.system,
                            startOrbit:             inputs.startOrbit,
                            endOrbit:               inputs.endOrbit,
                            startDate,
                            flightTime,
                            ejectionInsertionType:  inputs.ejectionInsertionType,
                            planeChange:            inputs.planeChange,
                            matchStartMo:           inputs.matchStartMo,
                            matchEndMo:             inputs.matchEndMo,
                            noInsertionBurn:        inputs.noInsertionBurn,
                        })
                        newPlotData.bestTransfer = transferCalculator.data;
                        console.log('Recalculated transfer after Porkchop click.')
                        setTransfer(transferCalculator.transfer);
                        setPlotData(newPlotData);
                        }
                    }
                    onRelayout={(eventData: any) => {
                        if( eventData["xaxis.range[0]"] || eventData["yaxis.range[0]"] ) {
                            const secondsPerDay = timeSettings.hoursPerDay * 3600;
                            const newInputs: PorkchopInputs = Object.assign(inputs);
                            if(eventData["xaxis.range[0]"]) {
                                newInputs.startDateMin  = eventData["xaxis.range[0]"] * secondsPerDay;
                                newInputs.startDateMax  = eventData["xaxis.range[1]"] * secondsPerDay;
                            }
                            if(eventData["yaxis.range[0]"]) {
                                newInputs.flightTimeMin = Math.max(1, eventData["yaxis.range[0]"] * secondsPerDay);
                                newInputs.flightTimeMax = Math.max(1, eventData["yaxis.range[1]"] * secondsPerDay);
                            }
                            console.log('Starting Porkchop worker after relayout (zoom or pan)...');
                            setCalculating(true);
                            porkchopWorker
                                .postMessage({inputs: newInputs, timeSettings});
                        }
                    }
                    }
                    // frames={[]}
                    // config={{}}
                />
            </Box>
        </Fade>
    )
}

export default React.memo(PorkchopPlot);