import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import CardTest from '../components/CardTest'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import api from '../services/api'

export default function PageGenericTest() {
    const [tests, setTests] = useState([])
    const [filteredTests, setFilteredTests] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pagesNumber, setPagesNumber] = useState()

    const fetchData = async () => {
        if (currentPage > pagesNumber)
            return

        try {
            const response = await api.get(`api/tests/all?page_number=${currentPage}`)

            setTests([...tests, ...response.data])
            setFilteredTests([...filteredTests, ...response.data])
            setCurrentPage(currentPage + 1)
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }

    const getTestInfo = async () => {
        try {
            const response = await api.get(`api/tests/info`)
            setPagesNumber(Math.ceil(response.elements_number / response.elements_for_page))
        } catch (error) {
            console.error('Error fetching infos:', error)
        }
    }

    useEffect(() => {
        fetchData()
        getTestInfo()
    }, [])

    const handleScroll = (e) => {
        if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
            fetchData()
        }
    }

    function filterTests(e) {
        setFilteredTests(tests.filter((test) => {
            return test.instance_id.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())
        }))
    }

    return (
        <>
            <Navbar />
            <Grid item style={{ paddingTop: '3vh', paddingBottom: '3vh', display: 'flex', justifyContent: 'center' }}>
                <Searchbar api_endpoint='api/instances/all' bar_width='75%' default_text='Find a test made on a valve instance' onChange_func={filterTests} />
            </Grid>
            <Grid item style={{ maxHeight: '75vh', overflowY: 'auto', paddingTop: '3vh' }} onScroll={handleScroll}>
                <Grid container spacing={2} justifyContent="center">
                    {filteredTests.map((d) => (
                        <Grid item key={d._id}>
                            <Link to={`/tests/${d._id}`} style={{ textDecoration: 'none' }}>
                                <CardTest instance_id={d.instance_id} timestamp={d.timestamp} arr_data={d.data} />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid >
        </>
    )
}