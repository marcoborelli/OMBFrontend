import * as React from 'react'
import { CardActionArea, Typography, CardMedia, CardContent, Card } from '@mui/material'
import TableMainAngles from './TableMainAngles'

export default function CardValveFamily({ base_code, img_url, theoric_values, real_values }) {
    return (
        <Card sx={{ width: 330 }} style={{ backgroundColor: '#A2C6D8' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={img_url}
                    alt={base_code}
                    sx={{
                        maxWidth: '100%',
                        height: '180px',
                        objectFit: 'none'
                    }}
                    onError={(e) => {
                        e.target.src = "/noimage.jpg";
                    }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" align="center" component="div">
                        {base_code}
                    </Typography>

                    <TableMainAngles theoric_values={theoric_values} real_values={real_values} colWidth={"1px"}/>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}