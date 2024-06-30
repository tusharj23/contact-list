// src/ContactList.js
import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { CircularProgress, Grid, Card, CardContent, Typography, IconButton, Avatar, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './ContactList.css'; // Custom CSS for styling
import EditContactDialog from './EditContactDialog';

const ContactList = ({ loadingPosition, setLoadingPosition }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingContact, setEditingContact] = useState(null);

    useEffect(() => {
        const q = query(collection(db, 'contacts'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const contactsArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setContacts(contactsArray);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        try {
            setLoadingPosition(id);
            await deleteDoc(doc(db, 'contacts', id));
        } catch (error) {
            console.error('Error deleting contact:', error);
        } finally {
            setLoadingPosition(null);
        }
    };

    const handleEdit = (contact) => {
        setEditingContact(contact);
        setLoadingPosition(contact.id);
    };

    const handleDialogClose = () => {
        setEditingContact(null);
        setLoadingPosition(null);
    };

    const handleDialogSubmit = async () => {
        // Handle the update logic here
        handleDialogClose();
    };

    return (
        <div>
            {loading ? <CircularProgress /> : (
                <Grid container spacing={2}>
                    {contacts.map((contact, index) => (
                        <Grid item xs={12} sm={6} md={3} key={contact.id}>
                            <Card className={index % 2 === 0 ? 'card-even' : 'card-odd'}>
                                {loadingPosition === contact.id && <CircularProgress />}
                                <Box display="flex" justifyContent="center" mt={2}>
                                    <Avatar src={contact.image} alt={contact.name} sx={{ width: 80, height: 80 }} />
                                </Box>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" align="center">
                                        {contact.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" align="center">
                                        {contact.mobile}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" align="center">
                                        {contact.email}
                                    </Typography>
                                    <Box display="flex" justifyContent="center">
                                        <IconButton onClick={() => handleEdit(contact)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(contact.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    {loadingPosition === 'new' && (
                        <Grid item xs={12} sm={6} md={3}>
                            <CircularProgress />
                        </Grid>
                    )}
                </Grid>
            )}
            {editingContact && (
                <EditContactDialog 
                    open={Boolean(editingContact)}
                    handleClose={handleDialogClose}
                    contact={editingContact}
                    handleChange={(e) => setEditingContact({ ...editingContact, [e.target.name]: e.target.value })}
                    handleSubmit={handleDialogSubmit}
                />
            )}
        </div>
    );
};

export default ContactList;
