import * as React from 'react'
import { CardActionArea, Typography, CardContent, Card } from '@mui/material'
import GraphTest from './GraphTest'
import { getLastOpeningIndex } from '../services/utilities'

export default function CardTest({ instance_id, timestamp, arr_data }) {
    const lastOpenIndex = getLastOpeningIndex(arr_data)

    return (
        <Card sx={{ width: 330 }} style={{ backgroundColor: '#A2C6D8' }}>
            <CardActionArea>
                <GraphTest height={175} data={arr_data.slice(0, lastOpenIndex)} />
                <GraphTest height={175} data={arr_data.slice(lastOpenIndex, arr_data.length)} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {instance_id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Done on: {new Date(timestamp).toLocaleString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
