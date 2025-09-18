import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid, IconButton, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CardValveFamily from '../components/CardValveFamily'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import api from '../services/api'

export default function PageGenericValveFamilies() {
    const [families, setFamilies] = useState()
    const [filteredFamilies, setFilteredFamilies] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/families/all`)
                setFamilies(response.data)
                setFilteredFamilies(response.data)
            } catch (error) {
                console.error('Error fetching user data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    function filterValveFamilies(e) {
        setFilteredFamilies(families.filter((family) => {
            return family._id.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())
        }))
    }

    if (loading) {
        return <Loading text="Caricamento in corso..."></Loading>
    }

    return (
        <>
            <Navbar />
            <Grid item style={{ paddingTop: '3vh', paddingBottom: '3vh', display: 'flex', justifyContent: 'center' }}>
                <Stack spacing={1} direction="row" sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Searchbar api_endpoint='api/families/all' bar_width='75%' default_text='Find a valve family' onChange_func={filterValveFamilies} />
                    <Link to={`/families/add`} style={{ textDecoration: 'none' }}>
                        <IconButton aria-label="add family" size="large">
                            <AddIcon />
                        </IconButton>
                    </Link>
                </Stack>
            </Grid>
            <Grid item style={{ maxHeight: '75vh', overflowY: 'auto', paddingTop: '3vh' }}>
                <Grid container spacing={2} justifyContent="center">
                    {filteredFamilies.map((family) => (
                        <Grid item key={family._id}>
                            <Link to={`/families/${family._id}`} style={{ textDecoration: 'none' }}>
                                <CardValveFamily base_code={family._id} img_url={family.img_url} theoric_values={family.theoric_values} real_values={family.average_values} />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid >
        </>
    )
}