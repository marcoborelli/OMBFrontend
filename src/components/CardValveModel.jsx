import * as React from 'react'
import { CardActionArea, Typography, CardMedia, CardContent, Card } from '@mui/material'

export default function CardValveModel({ code, description, img_url }) {
    return (
        <Card sx={{ width: 330 }} style={{ backgroundColor: '#A2C6D8' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="180"
                    image={img_url}
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