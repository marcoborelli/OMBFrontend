import { useState } from 'react'
import { TextField, Button, MenuItem, Typography } from '@mui/material'
import MultiCellInput from './MultiCellInput'


export default function AddValveFamily({ family_ids, onSubmit_func }) {
    const [valveModel, setValveModel] = useState({
        _id: '',
        valve_family: '',
        description: '',
        gear_model: '',
        ma_gear: 0,
        img_url: ''
    })


    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit_func(valveModel)
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                type='text'
                variant='outlined'
                label='FamilyID'
                select
                onChange={e => setValveModel({ ...valveModel, valve_family: e.target.value })}
                value={valveModel.valve_family}
                fullWidth
                required
                sx={{ mb: 2 }}
            >
                {family_ids.map((fam_id) => (
                    <MenuItem key={`id_${fam_id}`} value={fam_id}>
                        {fam_id}
                    </MenuItem>
                ))}
            </TextField>

            <Typography variant="body2" color="text.secondary">
                ID *
            </Typography>
            <MultiCellInput length={13} isRequired default_values={valveModel.valve_family.padEnd(10).split('')} onInputChange_callback={val => setValveModel({ ...valveModel, _id: val.join('').trim() })} />

            <br />
            <br />

            <TextField
                type='text'
                variant='outlined'
                label='Description'
                onChange={e => setValveModel({ ...valveModel, description: e.target.value })}
                value={valveModel.description}
                fullWidth
                required
                multiline
                sx={{ mb: 2 }}
            />

            <TextField
                type='text'
                variant='outlined'
                label='Gear Model'
                onChange={e => setValveModel({ ...valveModel, gear_model: e.target.value })}
                value={valveModel.gear_model}
                fullWidth
                required
                sx={{ mb: 2 }}
            />

            <TextField
                type='number'
                variant='outlined'
                label='M.A. Gear'
                value={valveModel.ma_gear >= 0 ? valveModel.ma_gear : ''}
                fullWidth
                required
                sx={{ mb: 2 }}
                onChange={e => setValveModel({ ...valveModel, ma_gear: parseFloat(e.target.value) })}
            />

            <TextField
                type='text'
                variant='outlined'
                label='Link to the image'
                onChange={e => setValveModel({ ...valveModel, img_url: e.target.value })}
                value={valveModel.img_url}
                fullWidth
                multiline
                sx={{ mb: 2 }}
            />

            <br />

            <Button variant="outlined" type="submit">Add new family</Button>
        </form>
    )
}