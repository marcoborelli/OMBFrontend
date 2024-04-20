import * as React from 'react'
import { LineChart } from '@mui/x-charts/LineChart'

export default function GraphTest({ height, data }) {
    return (
        <LineChart
            xAxis={[{ data: data.map(val => val.angle) }]} //pair
            series={[{
                data: data.map(val => val.pair),
                area: true,
                showMark: false
            }]} //angle
            height={height}
        />
    )
}
