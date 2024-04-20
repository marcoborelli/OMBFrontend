import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, TextField, Grid } from '@mui/material'
import CardTest from '../components/CardTest'
import Loading from '../components/Loading'
import api from '../services/api'

export default function PageVlaveInstance() {
    const { instanceID } = useParams()
    const [instance, setInstance] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/instances/get/${instanceID}`)
                setInstance(response.data)
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
        <Grid container spacing={3}>
            <Grid item xs={12} sm={3} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                <Card>
                    <CardContent>
                        <TextField
                            label="Serial number"
                            value={instance._id}
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />

                        <br />
                        <br />

                        <TextField
                            label="Job Number"
                            value={instance.job_number}
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />

                        <br />
                        <br />

                        <TextField //TODO: inserire collegamento a valvola con quell'id
                            label="Valve Model"
                            value={instance.valve_model._id}
                            InputProps={{ readOnly: true }}
                            fullWidth
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={9} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                <Grid container spacing={2} justifyContent="center">
                    {instance.tests.map((test) => (
                        <Grid item key={test._id}>
                            <Link to={`/tests/${test._id}`} style={{ textDecoration: 'none' }}>
                                <CardTest valve_id={test._id} timestamp={test.timestamp} arr_data={test.data} />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid >
    )
}