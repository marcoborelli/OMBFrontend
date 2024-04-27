import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, TextField, Grid } from '@mui/material'
import CardTest from '../components/CardTest'
import TableMainAngles from '../components/TableMainAngles'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import api from '../services/api'
import { getErrorPage } from '../services/utilities'

export default function PageVlaveInstance() {
    const { instanceID } = useParams()
    const [instance, setInstance] = useState()
    const [loading, setLoading] = useState(true)

    const [error, setError] = useState(-1)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/instances/get/${instanceID}`)
                setInstance(response.data)
            } catch (error) {
                setError(error.response.status)
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
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
                <Grid item xs={12} sm={3} style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                    <Card elevation={0}>
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

                            <Link to={`/models/${instance.valve_model._id}`}>
                                <TextField
                                    label="Valve Model"
                                    value={instance.valve_model._id}
                                    InputProps={{ readOnly: true }}
                                    fullWidth
                                />
                            </Link>

                            <br />
                            <br />
                            <TableMainAngles theoric_values={instance.valve_model.valve_family.theoric_values} real_values={instance.average_values} colWidth={"20px"} digits={1} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={9} style={{ maxHeight: '75vh', overflowY: 'auto', paddingTop: '3vh' }}>
                    <Grid container spacing={2} justifyContent="center">
                        {instance.tests.map((test) => (
                            <Grid item key={test._id}>
                                <Link to={`/tests/${test._id}`} style={{ textDecoration: 'none' }}>
                                    <CardTest instance_id="" timestamp={test.timestamp} arr_data={test.data} />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}