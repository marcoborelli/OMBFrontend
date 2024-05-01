import { useState, useEffect, createRef } from 'react'
import TextField from '@mui/material/TextField'

export default function MultiCellInput({ length, isRequired, default_values, onInputChange_callback }) {
    const [values, setValues] = useState(Array(length).fill(''))

    useEffect(() => {
        if (default_values) {
            const tmp = [...values]
            for (let i = 0; i < default_values.length; i++) {
                tmp[i] = default_values[i]
            }

            setValues(tmp)
            onInputChange_callback(tmp)
        }
    })

    const inputs = Array(length).fill().map(() => createRef())

    const handleChange = (index) => (event) => {
        const newValues = [...values]
        newValues[index] = event.target.value
        setValues(newValues)

        if (event.target.value && index < length - 1) {
            inputs[index + 1].current.focus()
        }

        onInputChange_callback(newValues)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {values.map((value, index) => (
                <TextField
                    key={index}
                    value={value}
                    onChange={handleChange(index)}
                    inputProps={{ maxLength: 1 }}
                    inputRef={inputs[index]}
                    required={isRequired}
                    InputProps={{ disabled: index < default_values?.length }}
                />
            ))}
        </div>
    )
}