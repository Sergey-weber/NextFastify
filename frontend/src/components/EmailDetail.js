import { Box, Typography, Paper } from '@mui/material';

export default function EmailDetail({ email }) {
    if (!email) {
        return (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography variant="h6" color="text.secondary">
                    Select an email to view its contents
                </Typography>
            </Box>
        );
    }

    return (
        <Paper sx={{ p: 3, height: '100%', overflow: 'auto' }}>
            <Typography variant="h5" gutterBottom>
                {email.subject}
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                    To: {email.to}
                </Typography>
                {email.cc && (
                    <Typography variant="body2" color="text.secondary">
                        CC: {email.cc}
                    </Typography>
                )}
                {email.bcc && (
                    <Typography variant="body2" color="text.secondary">
                        BCC: {email.bcc}
                    </Typography>
                )}
            </Box>

            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {email.body}
            </Typography>
        </Paper>
    );
} 