import React from 'react';
import { Grid, FormControl, InputLabel, Input, Select, MenuItem } from '@mui/material';

function ViewProfile() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input id="firstName" type="text" placeholder="Tim" />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <Input id="lastName" type="text" placeholder="Cook" />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
          <Input id="phoneNumber" type="tel" placeholder="(408) 996–1010" />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="emailAddress">Email Address</InputLabel>
          <Input id="emailAddress" type="email" placeholder="tcook@apple.com" />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="city">City</InputLabel>
          <Select
            label="City"
            id="city"
            defaultValue="newyork"
          >
            <MenuItem value="california">California</MenuItem>
            <MenuItem value="washington">Washington</MenuItem>
            <MenuItem value="toronto">Toronto</MenuItem>
            <MenuItem value="newyork">New York</MenuItem>
            <MenuItem value="london">London</MenuItem>
            <MenuItem value="netherland">Netherland</MenuItem>
            <MenuItem value="poland">Poland</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="country">Country</InputLabel>
          <Select
            label="Country"
            id="country"
            defaultValue="america"
          >
            <MenuItem value="america">America</MenuItem>
            <MenuItem value="england">England</MenuItem>
            <MenuItem value="poland">Poland</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default ViewProfile;
