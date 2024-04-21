import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, CardMedia, TextField, Grid } from '@mui/material'
import CardValveInstance from '../components/CardValveInstance'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import api from '../services/api'
import { getErrorPage } from '../services/utilities'

export default function PageValveModel() {
    const { modelID } = useParams()
    const [valve, setValve] = useState()
    const [instances, setInstances] = useState([])

    const [error, setError] = useState(-1)

    const [loadingValves, setLoadingValves] = useState(true)
    const [loadingInstances, setLoadingInstances] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/valves/get/${modelID}`)
                setValve(response.data)
            } catch (error) {
                setError(error.response.status)
                console.error('Error fetching user data:', error)
            } finally {
                setLoadingValves(false)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/instances/all/${modelID}`)
                setInstances(response.data)
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoadingInstances(false)
            }
        }

        fetchData()
    }, [])

    if (error != -1) {
        return getErrorPage(error)
    }

    if (loadingValves || loadingInstances) {
        return <Loading text="Caricamento in corso..."></Loading>
    }

    return (
        <>
        <Navbar/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3} style={{ maxHeight: '93vh', overflowY: 'auto' }}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="200"
                            image={valve.img_url}
                            alt={valve._id}
                        />

                        <CardContent>
                            <TextField
                                label="Code"
                                value={valve._id}
                                InputProps={{ readOnly: true }}
                                fullWidth
                            />

                            <br />
                            <br />

                            <TextField
                                label="Description"
                                value={valve.description}
                                InputProps={{ readOnly: true }}
                                multiline
                                fullWidth
                            />

                            <br />
                            <br />

                            <TextField
                                label="Gear Model"
                                value={valve.gear_model}
                                InputProps={{ readOnly: true }}
                                fullWidth
                            />

                            <br />
                            <br />

                            <TextField
                                label="M.A. Gear"
                                value={valve.ma_gear}
                                type="number"
                                InputProps={{ readOnly: true }}
                                fullWidth
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={9} style={{ maxHeight: '100vh', overflowY: 'auto', paddingTop: '3vh' }}>
                    <Grid container spacing={2} justifyContent="center">
                        {instances.map((instance) => (
                            <Grid item key={instance._id}>
                                <Link to={`/instances/${instance._id}`} style={{ textDecoration: 'none' }}>
                                    <CardValveInstance serial_number={instance._id} job_number={instance.job_number} key={`${instance._id}`} />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}