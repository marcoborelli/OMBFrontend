import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Divider, Chip, List, ListItem, ListItemAvatar, Avatar, ListItemText, Box } from '@mui/material'
import CardValveFamily from '../components/CardValveFamily'
import TableMainAngles from '../components/TableMainAngles'
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

    const fake_theoric_values = { bto: 106, runo: 40, eto: 78, btc: 106, runc: 40, etc: 65 }
    const fake_actual_values = { bto: 108, runo: 38, eto: 78, btc: 150, runc: 41, etc: 40 }

    return (
        <>
            <Navbar />
            <Grid container>
                <Grid item xs={12} sm={3} style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                    <Grid item style={{ paddingTop: '3vh', paddingBottom: '3vh', display: 'flex', justifyContent: 'center' }}>
                        <Searchbar api_endpoint='api/families/all' bar_width='90%' default_text='Find a valve family' onChange_func={filterValveFamilies} />
                    </Grid>

                    <Divider>
                        <Chip label="Table example & legend" size="small" />
                    </Divider>

                    <br />
                    <Box component="section" sx={{ p: 2 }}>
                        <TableMainAngles theoric_values={fake_theoric_values} real_values={fake_actual_values} colWidth={"20px"} showRowName />
                    </Box>
                    <br />

                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: '#FF7F7F', color: '#FF7F7F'}} variant='rounded'/>
                            </ListItemAvatar>
                            <ListItemText primary="Error" secondary="The average is higher than the theoric one (more than 30%)" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: '#FCD299', color: '#FCD299' }} variant='rounded'/>
                            </ListItemAvatar>
                            <ListItemText primary="Warning" secondary="The average is higher than the theoric one (but less than 30%)" />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} sm={9} style={{ maxHeight: '75vh', overflowY: 'auto', paddingTop: '3vh' }}>
                    <Grid container spacing={2} justifyContent="center">
                        {filteredFamilies.map((family) => (
                            <Grid item key={family._id}>
                                <Link to={`/families/${family._id}`} style={{ textDecoration: 'none' }}>
                                    <CardValveFamily base_code={family._id} img_url={family.img_url} theoric_values={family.theoric_values} real_values={family.average_values} />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}