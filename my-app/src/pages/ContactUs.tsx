import React, { useEffect, useState } from 'react';
import { Container, Grid2, Typography } from '@mui/material';
import { fetchContactUs } from '../services/Contentful/contactUs';

// const useStyles = makeStyles({
//     root: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       height: '100vh',
//       marginTop: '80px',
//       width: '100vw',
//     },
//   });

const ContactUs: React.FC = () => {
  const [contactInfo, setFContactInfo] = useState<any>();

  useEffect(() => {
    const getContactUsInfo = async () => {
      const data = await fetchContactUs();
      setFContactInfo(data);
    };
    getContactUsInfo();
  }, []);

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">{contactInfo?.body}</Typography>

        <Grid2 container spacing={3} justifyContent="center">
          <Grid2>
            <Typography variant="h6" gutterBottom>
              Contact Details
            </Typography>
            <Typography variant="body1">
              <strong>Phone:</strong> {contactInfo?.phone}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {contactInfo?.email}
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> {contactInfo?.address}
            </Typography>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default ContactUs;
