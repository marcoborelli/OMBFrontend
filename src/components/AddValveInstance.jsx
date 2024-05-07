import { useState } from 'react'
import { TextField, Button, MenuItem } from '@mui/material'


export default function AddValveInstance({ model_ids, default_model, onSubmit_func }) {
    const [valveInstance, setValveInstance] = useState({
        _id: '',
        valve_model: model_ids.includes(default_model) ? default_model : '',
        job_number: '',
    })


    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit_func(valveInstance)
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                type='text'
                variant='outlined'
                label='Model ID'
                select
                onChange={e => setValveInstance({ ...valveInstance, valve_model: e.target.value })}
                value={valveInstance.valve_model}
                fullWidth
                required
                sx={{ mb: 2 }}
            >
                {model_ids.map((mod_id) => (
                    <MenuItem key={`id_${mod_id}`} value={mod_id}>
                        {mod_id}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                type='text'
                variant='outlined'
                label='Id'
                onChange={e => setValveInstance({ ...valveInstance, _id: e.target.value })}
                value={valveInstance._id}
                fullWidth
                required
                multiline
                sx={{ mb: 2 }}
            />

            <TextField
                type='text'
                variant='outlined'
                label='Job Number'
                onChange={e => setValveInstance({ ...valveInstance, job_number: e.target.value })}
                value={valveInstance.job_number}
                fullWidth
                required
                multiline
                sx={{ mb: 2 }}
            />
            <br />

            <Button variant="outlined" type="submit">Add new instance</Button>
        </form>
    )
}