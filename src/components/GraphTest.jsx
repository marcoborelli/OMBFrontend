import * as React from 'react'
import { LineChart } from '@mui/x-charts/LineChart'

export default function GraphTest({ height, data, isInCard, isClosing }) {
    let axisData = data.map(val => val.angle)
    let pairData = data.map(val => val.pair)

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
