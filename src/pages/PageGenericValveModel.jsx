import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import CardValveModel from '../components/CardValveModel'

export default function PageGenericValveModel({ valves }) {
    return (
        <Grid item style={{ maxHeight: '100vh', overflowY: 'auto' }}>
            <Grid container spacing={2} justifyContent="center">
                {valves.map((valve) => (
                    <Grid item>
                        <CardValveModel code={valve._id} description={valve.description} img_url={valve.img_url} key={`${valve._id}`} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};