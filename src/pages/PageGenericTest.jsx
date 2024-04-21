import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import CardTest from '../components/CardTest'
import Loading from '../components/Loading'
import api from '../services/api'

export default function PageGenericTest() {
    const [tests, setTests] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/tests/all`)
                setTests(response.data)
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
        <Grid item style={{ maxHeight: '100vh', overflowY: 'auto', paddingTop: '3vh' }}>
            <Grid container spacing={2} justifyContent="center">
                {tests.map((d) => (
                    <Grid item key={d._id}>
                        <Link to={`/tests/${d._id}`} style={{ textDecoration: 'none' }}>
                            <CardTest instance_id={d.instance_id} timestamp={d.timestamp} arr_data={d.data} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Grid >
    )
}