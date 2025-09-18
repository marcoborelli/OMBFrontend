import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Container, Grid, Paper } from '@mui/material'
import Navbar from '../components/Navbar'
import AddValveInstance from '../components/AddValveInstance'
import Loading from '../components/Loading'
import api from '../services/api'

export default function PageAddValveInstance() {
    const { modelId } = useParams();
    const [modelsIds, setModelIds] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/valves/all?showFamily=false`)
                setModelIds(response.data.map(x => x._id))
            } catch (error) {
                console.error('Error fetching user data:', error)
                //TODO: aggiungere gestione errore
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const addNewInstance = async (to_insert) => {
        try {
            await api.post('api/instances/add', to_insert);
        } catch (error) {
            console.error('Error adding new valve model', error);
        }

        <Navigate to={`/instances/${to_insert._id}`} />
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
                        <AddValveInstance model_ids={modelsIds} onSubmit_func={addNewInstance} default_model={modelId}/>
                    </Paper>
                </Grid>
            </Container>
        </>
    )
}