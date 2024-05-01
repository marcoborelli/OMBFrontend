import { useState, createRef } from 'react'
import TextField from '@mui/material/TextField'

const MultiCellInput = ({ length, isRequired, isReadOnly, onInputChange_callback }) => {
    const [values, setValues] = useState(Array(length).fill(''))
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
                    InputProps={{ readOnly: isReadOnly }}
                />
            ))}
        </div>
    )
}

export default MultiCellInput