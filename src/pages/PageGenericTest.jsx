import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import CardTest from '../components/CardTest'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import api from '../services/api'

export default function PageGenericTest() {
    const [tests, setTests] = useState([])
    const [filteredTests, setFilteredTests] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)

        try {
            const response = await api.get(`api/tests/all`)
            setTests(response.data)
            setFilteredTests(response.data)
        } catch (error) {
            console.error('Error fetching user data:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    function filterTests(e) {
        setFilteredTests(tests.filter((test) => {
            return test.instance_id.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())
        }))
    }

    if (loading) {
        return <Loading text="Caricamento in corso..."></Loading>
    }

    return (
        <>
            <Navbar />
            <Grid item style={{ paddingTop: '3vh', paddingBottom: '3vh', display: 'flex', justifyContent: 'center' }}>
                <Searchbar api_endpoint='api/instances/all' bar_width='75%' default_text='Find a test made on a valve instance' onChange_func={filterTests} />
            </Grid>
            <Grid item style={{ maxHeight: '75vh', overflowY: 'auto', paddingTop: '3vh' }}>
                <Grid container spacing={2} justifyContent="center">
                    {filteredTests.map((d) => (
                        <Grid item key={d._id}>
                            <Link to={`/tests/${d._id}`} style={{ textDecoration: 'none' }}>
                                <CardTest instance_id={d.instance_id} timestamp={d.timestamp} arr_data={d.data} />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid >
        </>
    )
}