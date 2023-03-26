import React, { useEffect, useState } from 'react';
import '../styles/shared.css';
import { getApiWrapper } from '../util/apiUtil';
import { Button, Container, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { LeaderboardRow, PondUser } from '../types';
import { expToLevel } from '../util/util';

const LEADERBOARD_COLUMNS: GridColDef[] = [
    {
        field: 'ranking',
        headerName: 'Ranking',
        filterable: false,
        renderCell: (params: GridRenderCellParams) => <Typography>{params.value}</Typography>
    },
    {
        field: 'usernameData',
        headerName: 'Username',
        renderCell: (params: GridRenderCellParams) => {
            return (
                <Typography color={(params.value.isClient) ? "primary" : ""}>
                    {params.value.username}
                </Typography>
            );
        },
        width: 700
        
    },
    {
        field: 'level',
        headerName: 'Level',
        renderCell: (params: GridRenderCellParams) => <Typography>{params.value}</Typography>,
        width: 150
    },
    {
        field: 'exp',
        headerName: 'Exp',
        renderCell: (params: GridRenderCellParams) => <Typography>{params.value}</Typography>,
        width: 300
    },
]

export default function Leaderboard() {

    const [pondUsers, setPondUsers] = useState<LeaderboardRow[]>([]);
    const [clientUser, setClientUser] = useState<PondUser | null>(null);

    useEffect(() => {
        getApiWrapper('/user', (data: any) => {
            setClientUser(data);
        });

        getApiWrapper('/user/leaderboard/', (data: any) => {
            data = data.map((row: PondUser, index: number) => {
                const leaderboardRow: LeaderboardRow = {
                    ...row,
                    ranking: index + 1,
                    level: expToLevel(row.exp),
                    usernameData: {
                        username: row.username,
                        isClient: clientUser?.id === row.id
                    }
                }
                return leaderboardRow;
            })
            setPondUsers(data);
        });

      }, [clientUser]);
      
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
