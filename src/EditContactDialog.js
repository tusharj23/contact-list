// src/EditContactDialog.js
import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const EditContactDialog = ({ open, handleClose, contact, handleChange, handleSubmit }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogContent>
                <TextField label="Image URL" name="image" value={contact.image} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Name" name="name" value={contact.name} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Mobile" name="mobile" value={contact.mobile} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Email" name="email" value={contact.email} onChange={handleChange} fullWidth margin="normal" required />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

EditContactDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    contact: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default EditContactDialog;
