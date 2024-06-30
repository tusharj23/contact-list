import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(-1); // Navigate back to the previous page or any desired route
        }, 200); 

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress color="primary" size={80} thickness={4} />
            <Typography variant="h6" mt={2}>
                Loading...
            </Typography>
        </Box>
    );
};

export default LoadingPage;
