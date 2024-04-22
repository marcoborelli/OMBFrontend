import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import CardValveModel from '../components/CardValveModel'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import api from '../services/api'

export default function PageGenericValveModel() {
    const [valves, setValves] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/valves/all`)
                setValves(response.data)
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return <Loading text="Caricamento in corso..."></Loading>
    }

    return (
        <>
            <Navbar />
            <Grid item style={{ paddingTop: '3vh' }}>
                <Grid container spacing={2} justifyContent="center">
                    {valves.map((valve) => (
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