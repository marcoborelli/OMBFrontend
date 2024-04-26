import * as React from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'

export default function TableMainAngles({ theoric_values, real_values, colors }) {
    const colWidth = "1px" //in questo modo la colonna e' larga il minimo
    const digits = 0

    const getColorObj = (theoric, real) => {
        let res

        if (real <= theoric) {
            res = "none"
        } else if (real > theoric && real < 30 * 100 / theoric + theoric) {
            res = "orange" //se è maggiore del teroico ma minore del 30% in più
        } else {
            res = "red"
        }

        return res
    }

    return (
        <TableContainer component={Paper}>
            <Table size="small" >
                <TableHead>
                    <TableRow>
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
                        {Object.keys(theoric_values).map((key) => (
                            <TableCell key={`${key}_t`} sx={{ maxWidth: colWidth }}>
                                {theoric_values?.[key] ? theoric_values[key].toFixed(digits) : "N.A."}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        {Object.keys(real_values).map((key) => (
                            <TableCell key={`${key}_t`} sx={{ maxWidth: colWidth, backgroundColor: getColorObj(theoric_values[key], real_values[key]) }}>
                                {real_values?.[key] ? real_values[key].toFixed(digits) : "N.A."}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}