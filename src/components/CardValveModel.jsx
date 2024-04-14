import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard({ code, description }) {
    return (
        <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: '#A2C6D8'}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="180"
                    image="/noimage.jpg" //TODO: importare la vera immagine
                    alt={code}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" align="center" component="div">
                        {code}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}