import * as React from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'

export default function TableMainAngles({ theoric_values, real_values, colWidth, digits, showRowName }) {
    const getColorObj = (theoric, real) => {
        let res

        if (isNaN(real) || !real) {
            res = '#EBDFE1'
        } else if (real <= theoric) {
            res = 'none'
        } else if (real > theoric && real < 30 * theoric / 100 + theoric) {
            res = '#FCD299' //se e' maggiore del teroico ma minore del 30% in piu'
        } else {
            res = '#FF7F7F'
        }

        return res
    }

    if (!real_values) {
        real_values = {}
    }

    return (
        <TableContainer component={Paper}>
            <Table size="small" >
                <TableHead>
                    <TableRow>
                        {showRowName && <TableCell />}
                        <TableCell sx={{ maxWidth: colWidth }}>BTO</TableCell>
                        <TableCell sx={{ maxWidth: colWidth }}>RUN</TableCell>
                        <TableCell sx={{ maxWidth: colWidth }}>ETO</TableCell>
                        <TableCell sx={{ maxWidth: colWidth }}>BTC</TableCell>
                        <TableCell sx={{ maxWidth: colWidth }}>RUN</TableCell>
                        <TableCell sx={{ maxWidth: colWidth }}>ETC</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        {showRowName && <TableCell>Theoric</TableCell>}
                        {Object.keys(theoric_values).map((key) => (
                            <TableCell key={`${key}_t`} sx={{ maxWidth: colWidth }}>
                                {theoric_values?.[key] ? theoric_values[key].toFixed(digits) : "N.A."}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        {showRowName && <TableCell>Actual</TableCell>}
                        {Object.keys(theoric_values).map((key) => (
                            <TableCell key={`${key}_r`} sx={{ maxWidth: colWidth, backgroundColor: getColorObj(theoric_values[key], real_values[key]) }}>
                                {real_values?.[key] ? real_values[key].toFixed(digits) : "N.A."}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}