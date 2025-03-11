import { useState } from 'react';
import { Box, Fab } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import EmailList from '../components/EmailList';
import EmailDetail from '../components/EmailDetail';
import ComposeEmail from '../components/ComposeEmail';

export default function Home() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
        sx={{
          width: 360,
          borderRight: 1,
          borderColor: 'divider',
          height: '100%',
          overflow: 'auto',
        }}
      >
        <EmailList onEmailSelect={setSelectedEmail} />
      </Box>

      <Box sx={{ flex: 1, p: 0, position: 'relative' }}>
        <EmailDetail email={selectedEmail} />

        <Fab
          color="primary"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          onClick={() => setIsComposeOpen(true)}
        >
          <EmailIcon />
        </Fab>
      </Box>

      <ComposeEmail
        open={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
      />
    </Box>
  );
}
