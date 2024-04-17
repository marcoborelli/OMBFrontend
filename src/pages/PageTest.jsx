import { useState, useEffect } from 'react'
import { Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material'
import GraphTest from '../components/GraphTest'
import TableTest from '../components/TableTest'

export default function PageTest({ data }) {
    const defaultChoice = "Opening"

    const [windowSize, setWindowSize] = useState(document.documentElement.clientHeight)
    const [selectedData, setSelectedData] = useState(defaultChoice)

    function getLastOpeningIndex() {
        let i = 0
        let lastAngle = -1

        for (i = 0; i < data.length; i++) {
            if (data[i].angle <= lastAngle) {
                break
            }

            lastAngle = data[i].angle
        }

        return i
    }

    function getEffectiveData(type) {
        let final_data

        switch (type) {
            case "Opening":
                final_data = data.slice(0, getLastOpeningIndex())
                break
            case "Closing":
                final_data = data.slice(getLastOpeningIndex(), data.length)
                break
            case "All":
                final_data = data
                break
        }

        return final_data
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(document.documentElement.clientHeight)
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])



    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={3} style={{ height: '100vh', overflowY: 'auto' }}>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">View only:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue={(defaultChoice)}
                        onChange={(e) => setSelectedData(e.target.value)}
                    >
                        <FormControlLabel value="Opening" control={<Radio />} label="Opening" />
                        <FormControlLabel value="Closing" control={<Radio />} label="Closing" />
                        <FormControlLabel value="All" control={<Radio />} label="All" />
                    </RadioGroup>
                </FormControl>

                <TableTest rows={getEffectiveData(selectedData)}></TableTest>
            </Grid>
            <Grid item xs={12} sm={9} style={{ backgroundColor: '#FFECCB' }}>
                {(selectedData == "All" || selectedData == "Opening") && <GraphTest height={windowSize * 0.50} data={getEffectiveData("Opening")} />}
                {(selectedData == "All" || selectedData == "Closing") && <GraphTest height={windowSize * 0.50} data={getEffectiveData("Closing")} />}
            </Grid>
        </Grid >
    )
}