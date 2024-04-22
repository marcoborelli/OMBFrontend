import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import CardValveModel from '../components/CardValveModel'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import api from '../services/api'

export default function PageGenericValveModel() {
    const [valves, setValves] = useState()
    const [filteredValves, setFilteredValves] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/valves/all`)
                setValves(response.data)
                setFilteredValves(response.data)
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    function filterValveModels(e) {
        setFilteredValves(valves.filter((valve) => {
            return valve._id.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())
        }))
    }

    if (loading) {
        return <Loading text="Caricamento in corso..."></Loading>
    }

    return (
        <>
            <Navbar />
            <Grid item style={{ paddingTop: '3vh', paddingBottom: '3vh', display: 'flex', justifyContent: 'center' }}>
                <Searchbar api_endpoint='api/valves/all' bar_width='75%' default_text='Find a valve model' onChange_func={filterValveModels} />
            </Grid>
            <Grid item style={{ maxHeight: '75vh', overflowY: 'auto', paddingTop: '3vh' }}>
                <Grid container spacing={2} justifyContent="center">
                    {filteredValves.map((valve) => (
                        <Grid item key={valve._id}>
                            <Link to={`/models/${valve._id}`} style={{ textDecoration: 'none' }}>
                                <CardValveModel code={valve._id} description={valve.description} img_url={valve.img_url} />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </>
    )
}