import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard({ valve_id, timestamp, arr_data }) {
    return (
        <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: '#A2C6D8' }}>
            <CardActionArea>
                <LineChart
                    xAxis={[{ data: arr_data.map(val => val.pair) }]} //pair
                    series={[{
                        data: arr_data.map(val => val.angle),
                        area: true,
                        showMark: false
                    }]} //angle
                    height={300}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {valve_id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Done on: {timestamp}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
