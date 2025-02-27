import * as React from 'react'
import { CardActionArea, Typography, CardMedia, CardContent, Card } from '@mui/material'

export default function CardValveModel({ code, description, gear_model, img_url }) {
    return (
        <Card sx={{ width: 330 }} style={{ backgroundColor: '#CAD8E6' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={img_url || `${import.meta.env.BASE_URL}/noimage.jpg`}
                    alt={code}
                    sx={{
                        maxWidth: '100%',
                        height: '180px',
                        objectFit: 'none'
                    }}
                    onError={(e) => {
                        e.target.src = `${import.meta.env.BASE_URL}/noimage.jpg`
                    }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" align="center" component="div">
                        {code}
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        {gear_model}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}