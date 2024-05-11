import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Box, CircularProgress, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CardTest from '../components/CardTest'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import api from '../services/api'

export default function PageGenericTest() {
    const [tests, setTests] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pagesNumber, setPagesNumber] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const [filterInstanceId, setFilterInstanceId] = useState('')
    const [isNewSearch, setIsNewSearch] = useState(true)

    const fetchData = async () => {
        if (!isNewSearch && currentPage >= pagesNumber)
            return

        setIsLoading(true)
        try {
            const response = await api.get(`api/tests/find?instance_id=${filterInstanceId}&page_number=${isNewSearch ? 1 : currentPage + 1}`)

            if (isNewSearch) {
                setIsNewSearch(false)
                setTests(response.data.query_data)
                setPagesNumber(Math.ceil(parseInt(response.data.elements_number) / parseInt(response.data.elements_for_page)))
                setCurrentPage(1)
            } else {
                setTests([...tests, ...response.data.query_data])
                setCurrentPage(currentPage + 1)
            }
        } catch (error) {
            console.error('Error fetching user data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!isNewSearch)
            return

        fetchData()
    }, [isNewSearch])

    const handleScroll = (e) => {
        if (!isLoading && e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
            fetchData()
        }
    }

    return (
        <>
            <Navbar />
            <Grid item style={{ paddingTop: '3vh', paddingBottom: '3vh', display: 'flex', justifyContent: 'center' }}>
                <Searchbar api_endpoint='api/instances/all' bar_width='75%' default_text='Find a test made on a valve instance' onChange_func={(e) => setFilterInstanceId(e.target.value.toUpperCase())} />
                <Button variant="outlined" onClick={() => setIsNewSearch(true)}>
                    <SearchIcon />
                </Button>
            </Grid>
            <Grid item style={{ maxHeight: '75vh', overflowY: 'auto', paddingTop: '3vh' }} onScroll={handleScroll}>
                <Grid container spacing={2} justifyContent="center">
                    {tests.map((d) => (
                        <Grid item key={d._id}>
                            <Link to={`/tests/${d._id}`} style={{ textDecoration: 'none' }}>
                                <CardTest instance_id={d.instance_id} timestamp={d.timestamp} arr_data={d.data} />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
                {(currentPage < pagesNumber || !pagesNumber) &&
                    <Box flexDirection="column" justifyContent="center" alignItems="center" sx={{ display: 'flex', paddingTop: '3vh' }}>
                        <CircularProgress />
                    </Box>
                }
            </Grid >
        </>
    )
}