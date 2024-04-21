import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material'
import GraphTest from '../components/GraphTest'
import TableTest from '../components/TableTest'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { getLastOpeningIndex, getErrorPage } from '../services/utilities'
import api from '../services/api'


export default function PageTest() {
    const { testID } = useParams()
    const [test, setTest] = useState()
    const [loading, setLoading] = useState(true)

    const [error, setError] = useState(-1)

    const defaultChoice = "Opening"

    const [windowSize, setWindowSize] = useState(document.documentElement.clientHeight)
    const [selectedData, setSelectedData] = useState(defaultChoice)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/tests/get/${testID}`)
                setTest(response.data)
            } catch (error) {
                setError(error.response.status)
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    function getEffectiveData(type) {
        let final_data
        let lastOpenIndex = getLastOpeningIndex(test.data)

        switch (type) {
            case "Opening":
                final_data = test.data.slice(0, lastOpenIndex)
                break
            case "Closing":
                final_data = test.data.slice(lastOpenIndex, test.data.length)
                break
            case "All":
                final_data = test.data
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

    if (error != -1) {
        return getErrorPage(error)
    }

    if (loading) {
        return <Loading text="Caricamento in corso..."></Loading>
    }

    return (
        <>
            <Navbar />
            <Grid container>
                <Grid item xs={12} sm={3} style={{ height: '93vh', overflowY: 'auto' }}>
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
                    {(selectedData == "All" || selectedData == "Opening") && <GraphTest height={windowSize * 0.46} data={getEffectiveData("Opening")} />}
                    {(selectedData == "All" || selectedData == "Closing") && <GraphTest height={windowSize * 0.46} data={getEffectiveData("Closing")} isClosing/>}
                </Grid>
            </Grid >
        </>
    )
}