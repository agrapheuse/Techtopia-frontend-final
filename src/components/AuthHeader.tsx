import Button from '@mui/material/Button'
import { Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import SecurityContext from '../context/SecurityContext'
import React from 'react'

export function AuthHeader() {
    const { isAuthenticated, logout, loggedInUser } = useContext(SecurityContext)
    return (
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 3, ml: 3 }}>
            {isAuthenticated() && (
                <>
                    <Typography>Hello {loggedInUser}</Typography>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={logout}>
                        Log out
                    </Button>
                </>
            )}
        </Stack>
    )
}
