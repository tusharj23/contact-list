// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import LoadingPage from './LoadingPage';
import { Container, Typography, Box } from '@mui/material';

const App = () => {
    const [editingContactId, setEditingContactId] = useState(null);
    const [loadingPosition, setLoadingPosition] = useState(null);

    const handleEdit = (id) => {
        setEditingContactId(id);
        setLoadingPosition(id);
    };

    const handleComplete = () => {
        setEditingContactId(null);
        setLoadingPosition(null);
    };

    return (
        <Router>
            <Container>
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Contact List
                    </Typography>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <ContactForm contactId={editingContactId} onComplete={handleComplete} setLoadingPosition={setLoadingPosition} />
                                <ContactList onEdit={handleEdit} loadingPosition={loadingPosition} setLoadingPosition={setLoadingPosition} />
                            </>
                        } />
                        <Route path="/loading" element={<LoadingPage />} />
                    </Routes>
                </Box>
            </Container>
        </Router>
    );
};

export default App;
