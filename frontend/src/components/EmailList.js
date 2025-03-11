import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, TextField, Box, Typography } from '@mui/material';
import { useDebounce } from 'use-debounce';

export default function EmailList({ onEmailSelect }) {
    const [emails, setEmails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

    useEffect(() => {
        const fetchEmails = async () => {
            const url = debouncedSearchQuery
                ? `http://localhost:3001/api/emails/search?query=${encodeURIComponent(debouncedSearchQuery)}`
                : 'http://localhost:3001/api/emails';

            const response = await fetch(url);
            const data = await response.json();
            setEmails(data);
        };

        fetchEmails();
    }, [debouncedSearchQuery]);

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Box sx={{ p: 2 }}>
                <TextField
                    fullWidth
                    placeholder="Search emails..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    size="small"
                />
            </Box>
            <List>
                {emails.map((email) => (
                    <ListItem
                        key={email.id}
                        button
                        onClick={() => onEmailSelect(email)}
                        sx={{ borderBottom: '1px solid #eee' }}
                    >
                        <ListItemText
                            primary={email.subject}
                            secondary={
                                <>
                                    <Typography component="span" variant="body2" color="text.primary">
                                        To: {email.to}
                                    </Typography>
                                    <br />
                                    {email.body.substring(0, 50)}...
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
} 