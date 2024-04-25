import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, CardMedia, TextField, Grid } from '@mui/material'
import CardValveInstance from '../components/CardValveInstance'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import api from '../services/api'
import { getErrorPage } from '../services/utilities'

export default function PageValveModel() {
    const { modelID } = useParams()
    const [valve, setValve] = useState()
    const [instances, setInstances] = useState([])
    const [filteredInstances, setFilteredInstances] = useState([])

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
                const response = await api.get(`api/instances/all/ofmodel/${modelID}`)
                setInstances(response.data)
                setFilteredInstances(response.data)
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoadingInstances(false)
            }
        }

        fetchData()
    }, [])

    function filterInstances(e) {
        setFilteredInstances(instances.filter((instance) => {
            return instance._id.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())
        }))
    }

    if (error != -1) {
        return getErrorPage(error)
    }

    if (loadingValves || loadingInstances) {
        return <Loading text="Caricamento in corso..."></Loading>
    }

    return (
        <>
            <Navbar />
            <Grid container>
                <Grid item xs={12} sm={3} style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                    <Card elevation={0}>
                        <CardMedia
                            component="img"
                            height="375"
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
                <Grid item xs={12} sm={9} style={{paddingTop: '3vh' }}>
                    <Grid item style={{ paddingTop: '3vh', paddingBottom: '3vh', display: 'flex', justifyContent: 'center' }}>
                        <Searchbar api_endpoint='api/instances/all' bar_width='75%' default_text='Find a valve model instance' onChange_func={filterInstances} />
                    </Grid>
                    <Grid container spacing={2} justifyContent="center" style={{  maxHeight: '70vh', overflowY: 'auto',paddingTop: '3vh', }}>
                        {filteredInstances.map((instance) => (
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