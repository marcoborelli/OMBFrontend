import * as React from 'react'
import { CardActionArea, Typography, CardContent, Card } from '@mui/material'

export default function CardValveInstance({ serial_number, job_number }) {
    return (
        <Card sx={{ width: 300 }} style={{ backgroundColor: '#CAD8E6' }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" align="center" component="div">
                        {serial_number}
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary">
                        {job_number}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}