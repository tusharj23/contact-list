import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import { db } from './firebase';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const countryCodes = [
    { code: '+91', label: 'India' },
    { code: '+1', label: 'USA' },
    { code: '+44', label: 'UK' },
    { code: '+61', label: 'Australia' },
    { code: '+33', label: 'France' },
    { code: '+49', label: 'Germany' },
    { code: '+81', label: 'Japan' },
    { code: '+86', label: 'China' },
    { code: '+7', label: 'Russia' },
    { code: '+52', label: 'Mexico' },
    { code: '+55', label: 'Brazil' },
    { code: '+234', label: 'Nigeria' },
    { code: '+27', label: 'South Africa' },
    { code: '+82', label: 'South Korea' },
    { code: '+39', label: 'Italy' },
    { code: '+34', label: 'Spain' },
    { code: '+31', label: 'Netherlands' },
    { code: '+92', label: 'Pakistan' },
    { code: '+880', label: 'Bangladesh' },
    { code: '+62', label: 'Indonesia' },
    { code: '+91', label: 'India' }, // Duplicate for default
];

const ContactForm = ({ contactId, onComplete, setLoadingPosition }) => {
    const [contact, setContact] = useState({ image: '', name: '', mobile: '', email: '', countryCode: '+91' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            if (contactId) {
                setLoading(true);
                const docRef = doc(db, 'contacts', contactId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setContact(docSnap.data());
                }
                setLoading(false);
            }
        };
        fetchContact();
    }, [contactId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const validateForm = () => {
        if (!contact.name || !contact.mobile || !contact.email) {
            setError('All fields are required');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setLoadingPosition(contactId ? contactId : 'new');
        navigate('/loading');

        try {
            if (contactId) {
                const docRef = doc(db, 'contacts', contactId);
                await updateDoc(docRef, contact);
            } else {
                await addDoc(collection(db, 'contacts'), contact);
            }
            onComplete();
        } catch (error) {
            console.error('Error updating contact:', error);
            setError('Error updating contact. Please try again.');
        } finally {
            setLoading(false);
            setLoadingPosition(null);
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Image URL"
                    name="image"
                    value={contact.image}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Name"
                    name="name"
                    value={contact.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    select
                    label="Country Code"
                    name="countryCode"
                    value={contact.countryCode}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    {countryCodes.map((option) => (
                        <MenuItem key={option.code} value={option.code}>
                            {option.label} ({option.code})
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Mobile"
                    name="mobile"
                    value={contact.mobile}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    InputProps={{
                        startAdornment: <span>{contact.countryCode}</span>,
                    }}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit" variant="contained" color="primary">
                    {contactId ? 'Update Contact' : 'Add Contact'}
                </Button>
            </form>
        </Box>
    );
};

ContactForm.propTypes = {
    contactId: PropTypes.string,
    onComplete: PropTypes.func.isRequired,
    setLoadingPosition: PropTypes.func.isRequired,
};

export default ContactForm;
