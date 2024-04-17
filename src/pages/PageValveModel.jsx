import { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, TextField, Grid } from '@mui/material';
import CardValveInstance from '../components/CardValveInstance'

export default function PageTest({ code, description, gear_model, ma_gear, img_url, instances }) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={3} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                <Card>
                    <CardMedia
                        component="img"
                        height="200"
                        image={img_url}
                        alt={code}
                    />

                    <CardContent>
                        <TextField
                            label="Code"
                            value={code}
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />

                        <br />
                        <br />

                        <TextField
                            label="Description"
                            value={description}
                            InputProps={{ readOnly: true }}
                            multiline
                            fullWidth
                        />

                        <br />
                        <br />

                        <TextField
                            label="Gear Model"
                            value={gear_model}
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />

                        <br />
                        <br />

                        <TextField
                            label="M.A. Gear"
                            value={ma_gear}
                            type="number"
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={9} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                <Grid container spacing={2} justifyContent="center">
                    {instances.map((instance) => (
                        <Grid item>
                            <CardValveInstance serial_number={instance._id} job_number={instance.job_number} key={`${instance._id}`} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid >
    );
};