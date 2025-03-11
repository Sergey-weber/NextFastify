import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
} from '@mui/material';

export default function ComposeEmail({ open, onClose }) {
    const [formData, setFormData] = useState({
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        body: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                onClose();
                setFormData({
                    to: '',
                    cc: '',
                    bcc: '',
                    subject: '',
                    body: '',
                });
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Compose Email</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            label="To"
                            name="to"
                            value={formData.to}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="CC"
                            name="cc"
                            value={formData.cc}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            label="BCC"
                            name="bcc"
                            value={formData.bcc}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            label="Subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Body"
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            required
                            multiline
                            rows={6}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">Send</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
} 