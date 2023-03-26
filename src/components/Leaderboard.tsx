import React, { useEffect, useState } from 'react';
import '../styles/shared.css';
import { getApiWrapper } from '../util/apiUtil';
import { Button, Container, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { PondUser } from '../types';
import { expToLevel } from '../util/util';

const LEADERBOARD_COLUMNS: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Ranking',
        filterable: false,
        renderCell: (params: GridRenderCellParams) => params.row.id,
    },
    {
        field: 'username',
        headerName: 'Username',
        renderCell: (params: GridRenderCellParams) => {
            return (
                <Typography color="primary">
                    {params.value}
                </Typography>
            );
        },
        width: 800
        
    },
    {
        field: 'exp',
        headerName: 'Level',
        renderCell: (params: GridRenderCellParams) => <Typography>{expToLevel(params.value)} ({params.value} exp)</Typography>,
        width: 300
    },
]

export default function Leaderboard() {

    const [pondUsers, setPondUsers] = useState<PondUser[]>([]);
    const [clientUser, setClientUser] = useState<PondUser | null>(null);

    useEffect(() => {

        getApiWrapper('/user/leaderboard/', (data: any) => {
          setPondUsers(data);
        });

        getApiWrapper('/user', (data: any) => {
            setClientUser(data);
        });

      }, []);
      
    return (
    <Container sx={{ py: 10 }}>
        <DataGrid
            columns={LEADERBOARD_COLUMNS}
            rows={pondUsers}
            autoHeight
        />
    </Container>
    );
}
