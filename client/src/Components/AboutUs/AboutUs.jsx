import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: "4px",
    textAlign: 'center',
    marginTop: "100px",
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: "4px",
  },
  paragraph: {
    fontSize: '1.2rem',
    marginBottom: "4px",
  },
}));

const AboutUs = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>About Placement Cell Management System</h1>
      <p className={classes.paragraph}>
        Welcome to the Placement Cell Management System, a revolutionary platform designed to streamline and enhance the entire process of managing placements within educational institutions.
      </p>
      <p className={classes.paragraph}>
        Our mission is to connect students with opportunities and empower them to succeed in their professional journey. With a focus on simplicity, efficiency, and user experience, we provide a comprehensive solution for both students and recruiters.
      </p>
      <h2 className={classes.heading}>Key Features</h2>
      <ul className={classes.paragraph}>
        <li>Effortless Job Posting and Application Process</li>
        <li>Real-time Updates on Placement Activities</li>
        <li>Interactive Dashboard for Insights and Analytics</li>
        <li>User-friendly Interface for Students and Recruiters</li>
      </ul>
      <h2 className={classes.heading}>Our Team</h2>
      <p className={classes.paragraph}>
        Meet the passionate individuals behind the Placement Cell Management System. Our team is dedicated to creating a platform that transforms the way placements are managed and experienced.
      </p>
      {/* Add team members and their roles */}
      <h2 className={classes.heading}>Contact Us</h2>
      <p className={classes.paragraph}>
        Have questions or feedback? Feel free to reach out to us. We value your input and are committed to continually improving our system to meet your needs.
      </p>
      {/* Add contact information */}
    </div>
  );
};

export default AboutUs;
