import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, CardMedia, TextField, Grid, IconButton, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CardValveModel from '../components/CardValveModel'
import TableMainAngles from '../components/TableMainAngles'
import Legend from '../components/Legend'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import api from '../services/api'
import { getErrorPage } from '../services/utilities'

export default function PageValveModel() {
    const { familyID } = useParams()
    const [family, setFamily] = useState()
    const [models, setModels] = useState([])
    const [filteredModels, setFilteredModels] = useState([])

    const [error, setError] = useState(-1)

    const [loadingFamilies, setLoadingFamilies] = useState(true)
    const [loadingModels, setLoadingModels] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/families/get/${familyID}`)
                setFamily(response.data)
            } catch (error) {
                setError(error.response.status)
                console.error('Error fetching user data:', error)
            } finally {
                setLoadingFamilies(false)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/valves/all/offamily/${familyID}`)
                setModels(response.data)
                setFilteredModels(response.data)
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoadingModels(false)
            }
        }

        fetchData()
    }, [])

    function filterModels(e) {
        setFilteredModels(models.filter((model) => {
            return model._id.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())
        }))
    }

    if (error != -1) {
        return getErrorPage(error)
    }

    if (loadingFamilies || loadingModels) {
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
                            image={family.img_url || "/noimage.jpg"}
                            alt={family._id}
                            onError={(e) => {
                                e.target.src = "/noimage.jpg"
                            }}
                        />

                        <CardContent>
                            <TextField
                                label="Code"
                                value={family._id}
                                InputProps={{ readOnly: true }}
                                sx={{ paddingBottom: '2vh' }}
                                fullWidth
                            />

                            <TableMainAngles theoric_values={family.theoric_values} real_values={family.average_values} colWidth={"20px"} digits={1} showRowName />
                            <Legend avatar_width={22} avatar_height={22} primary_size={14} secondary_size={12} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={9} style={{ paddingTop: '3vh' }}>
                    <Grid item style={{ paddingTop: '3vh', paddingBottom: '3vh', display: 'flex', justifyContent: 'center' }}>
                        <Stack spacing={1} direction="row" sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Searchbar api_endpoint='api/valves/all' bar_width='75%' default_text='Find a valve model' onChange_func={filterModels} />
                            <IconButton aria-label="add family" size="large" href={`/models/add/${family._id}`}>
                                <AddIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center" style={{ maxHeight: '70vh', overflowY: 'auto', paddingTop: '3vh', }}>
                        {filteredModels.map((model) => (
                            <Grid item key={model._id}>
                                <Link to={`/models/${model._id}`} style={{ textDecoration: 'none' }}>
                                    <CardValveModel code={model._id} gear_model={model.gear_model} description={model.description} img_url={model.img_url} />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}