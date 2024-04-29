import { useState } from 'react';
import { TextField, Button, Grid, Typography, Divider, Chip } from '@mui/material';


export default function AddValveFamily({ onSubmit_func }) {
    const [valveFamily, setValveFamily] = useState({
        _id: '',
        img_url: '',
        theoric_values: {
            bto: -1,
            btc: -1,
            runo: -1,
            runc: -1,
            eto: -1,
            etc: -1
        }
    })
    const labels = ["BTO", "BTC", "RUN", "RUN", "ETO", "ETC"]
    let index = 0


    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit_func(valveFamily)
    };

    return (
        <form onSubmit={handleSubmit}>

            <TextField
                type='text'
                variant='outlined'
                label='ID'
                onChange={e => setValveFamily({ ...valveFamily, _id: e.target.value })}
                value={valveFamily._id}
                fullWidth
                required
                sx={{ mb: 2 }}
            />
            <TextField
                type='text'
                variant='outlined'
                label='Link to the image'
                onChange={e => setValveFamily({ ...valveFamily, img_url: e.target.value })}
                value={valveFamily.img_url}
                fullWidth
                multiline
                sx={{ mb: 2 }}
            />

            <Divider>
                <Chip label="Theoric values" size="small" />
            </Divider>
            <br />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                        Opening
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                        Closing
                    </Typography>
                </Grid>
                {Object.keys(valveFamily.theoric_values).map((key) => (
                    <Grid item xs={6} key={`input_${[key]}`}>
                        <TextField
                            type='number'
                            variant='outlined'
                            label={labels[index++]}
                            value={valveFamily.theoric_values[key] >= 0 ? valveFamily.theoric_values[key] : ''}
                            fullWidth
                            required={true}
                            onChange={e => setValveFamily({ ...valveFamily, theoric_values: { ...valveFamily.theoric_values, [key]: parseFloat(e.target.value) } })}
                        />
                    </Grid>
                ))}
            </Grid>

            <br />

            <Button variant="outlined" type="submit">Add new family</Button>
        </form>
    )
}