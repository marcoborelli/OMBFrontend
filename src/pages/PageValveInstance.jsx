import { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Grid } from '@mui/material';
import CardTest from '../components/CardTest'

export default function PageTest({ serial_number, job_number, valve_model, tests }) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={3} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                <Card>
                    <CardContent>
                        <TextField
                            label="Serial number"
                            value={serial_number}
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />

                        <br />
                        <br />

                        <TextField
                            label="Job Number"
                            value={job_number}
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />

                        <br />
                        <br />

                        <TextField //TODO: inserire collegamento a valvola con quell'id
                            label="Valve Model"
                            value={valve_model}
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={9} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                <Grid container spacing={2} justifyContent="center">
                    {tests.map((test) => (
                        <Grid item>
                            <CardTest valve_id={test._id} timestamp={test.timestamp} arr_data={test.data} key={`${test._id}`} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid >
    );
};