import * as React from 'react'
import { styled } from '@mui/material/styles'
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, TableCell, tableCellClasses } from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#78A3C5',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#CAD8E6',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

export default function TableTest({ rows }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 150 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Angle&nbsp;(°)</StyledTableCell>
                        <StyledTableCell align="left">Pair&nbsp;(N/m)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={`${row.angle}-${row.pair}`}>
                            <StyledTableCell align="left">{row.angle}</StyledTableCell>
                            <StyledTableCell align="left">{row.pair}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
