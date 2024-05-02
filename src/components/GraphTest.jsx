import * as React from 'react'
import { LineChart } from '@mui/x-charts/LineChart'

export default function GraphTest({ height, data, isInCard, isClosing }) {
    let axisData = data.map(val => val.angle)
    let pairData = data.map(val => val.pair)

    if (isClosing) {
        //non so il motivo ma serve che gli angoli siano crescenti senno' non compare la tebella con il valore associato allo scorrimento del mouse
        axisData.sort(function (a, b) {
            return a - b;
        })
        //di conseguenza inverto ance l'array della coppia
        pairData = pairData.reverse()
    }

    return (
        <LineChart
            xAxis={[{
                data: axisData,
                reverse: isClosing,
                label: isInCard ? " " : "Angle (°)",
            }]} //pair

            series={[{
                data: pairData,
                area: true,
                showMark: false,
            }]} //angle

            yAxis={[{
                label: isInCard ? " " : "Pair (N/m)"
            }]}

            height={height}
        />
    )
}
