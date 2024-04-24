import { useState, useEffect } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import api from '../services/api'

export default function Searchbar({ api_endpoint, bar_width, default_text, onChange_func }) {
    const [myOptions, setMyOptions] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(api_endpoint)
                setMyOptions(response.data.map(val => val._id))

                console.log(response.data)
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }

        fetchData()
    }, [])


    return (
        <>
            <Autocomplete
                style={{ width: bar_width }}
                freeSolo
                autoComplete
                autoHighlight
                options={myOptions}
                renderInput={(params) => (
                    <TextField {...params}
                        onChange={onChange_func}
                        onSelect={onChange_func}
                        variant="outlined"
                        label={default_text}
                    />
                )}
            />
        </>
    )
}
