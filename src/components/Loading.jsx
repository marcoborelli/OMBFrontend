import * as React from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'

export default function Loading({ text }) {
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress color="primary" size={80} thickness={4} />
            <Typography variant="h6" color="white" style={{ marginTop: 16 }}>
                {text}
            </Typography>
        </Box>
    )
}