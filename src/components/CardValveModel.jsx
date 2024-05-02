import * as React from 'react'
import { CardActionArea, Typography, CardMedia, CardContent, Card } from '@mui/material'

export default function CardValveModel({ code, description, img_url }) {
    return (
        <Card sx={{ width: 330 }} style={{ backgroundColor: '#A2C6D8' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={img_url || "/noimage.jpg"}
                    alt={code}
                    sx={{
                        maxWidth: '100%',
                        height: '180px',
                        objectFit: 'none'
                    }}
                    onError={(e) => {
                        e.target.src = "/noimage.jpg"
                    }}
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
    )
}