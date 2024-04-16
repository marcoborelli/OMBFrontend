import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import GraphTest from './GraphTest'

export default function ActionAreaCard({ valve_id, timestamp, arr_data }) {
    return (
        <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: '#A2C6D8' }}>
            <CardActionArea>
                <GraphTest height={230} data={arr_data} />
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
