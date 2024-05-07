import { Container, Grid, Paper } from '@mui/material'
import Navbar from '../components/Navbar'
import AddValveFamily from '../components/AddValveFamily'
import api from '../services/api'

export default function PageAddValveFamily() {
    const addNewFamily = async (to_insert) => {
        try {
            await api.post('api/families/add', to_insert);
        } catch (error) {
            console.error('Error adding new family', error);
        }

        window.location.href = '/families'
    }

    return (
        <>
            <Navbar />
            <Container maxWidth="md" style={{ marginTop: '6vh', marginBottom: '20vh' }}>
                <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                    <Paper elevation={3} style={{ padding: 20, borderRadius: 10, backgroundColor: 'white', width: '100%' }}>
                        <AddValveFamily onSubmit_func={addNewFamily} />
                    </Paper>
                </Grid>
            </Container>
        </>
    )
}