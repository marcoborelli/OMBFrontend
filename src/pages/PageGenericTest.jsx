import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import CardTest from '../components/CardTest'

export default function PageGenericTest({ data }) {
    return (
        <Grid item style={{ maxHeight: '100vh', overflowY: 'auto' }}>
            <Grid container spacing={2} justifyContent="center">
                {data.map((d) => (
                    <Grid item>
                        <CardTest valve_id={d.valve_id} timestamp={d.timestamp} arr_data={d.data} key={`${d._id}`} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};