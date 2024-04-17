import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TableTest from '../components/TableTest'
import GraphTest from '../components/GraphTest'

export default function PageTest({ data }) {
    const [windowSize, setWindowSize] = useState(document.documentElement.clientHeight)

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(document.documentElement.clientHeight)
        };

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={3} style={{maxHeight: '100vh', overflowY: 'auto' }}>
                <TableTest rows={data}></TableTest>
            </Grid>
            <Grid item xs={12} sm={9} style={{ backgroundColor: '#FFECCB' }}>
                <GraphTest height={windowSize * 0.50} data={data} />
                <GraphTest height={windowSize * 0.50} data={data} />
            </Grid>
        </Grid >
    );
};