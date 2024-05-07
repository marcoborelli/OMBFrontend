import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Grid, Paper } from '@mui/material'
import Navbar from '../components/Navbar'
import AddValveModel from '../components/AddValveModel'
import Loading from '../components/Loading'
import api from '../services/api'

export default function PageAddValveModel() {
    const { familId } = useParams();
    const [familyIds, setModelsIds] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/families/all`)
                setModelsIds(response.data.map(x => x._id))
            } catch (error) {
                console.error('Error fetching user data:', error)
                //TODO: aggiungere gestione errore
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const addNewValve = async (to_insert) => {
        try {
            await api.post('api/valves/add', to_insert);
        } catch (error) {
            console.error('Error adding new valve model', error);
        }

        window.location.href = '/models'
    }


    if (loading) {
        return <Loading text="Caricamento in corso..."></Loading>
    }

    return (
        <>
            <Navbar />
            <Container maxWidth="md" style={{ marginTop: '6vh', marginBottom: '20vh' }}>
                <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                    <Paper elevation={3} style={{ padding: 20, borderRadius: 10, backgroundColor: 'white', width: '100%' }}>
                        <AddValveModel family_ids={familyIds} onSubmit_func={addNewValve} default_family={familId}/>
                    </Paper>
                </Grid>
            </Container>
        </>
    )
}