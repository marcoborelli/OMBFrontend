import { useState, useEffect, createRef } from 'react'
import { TextField, useMediaQuery } from '@mui/material'

export default function MultiCellInput({ length, isRequired, default_values, onInputChange_callback }) {
    const [values, setValues] = useState(Array(length).fill(''))
    const isSmallScreen = useMediaQuery('(max-width:600px)')

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
        newValues[index] = event.target.value.toUpperCase()
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
                    InputProps={{
                        disabled: index < default_values?.length,
                        style: { fontSize: isSmallScreen ? '60%' : '100%' }
                    }}
                />
            ))}
        </div>
    )
}