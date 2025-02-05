'use client';

import { Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Box, FormControl, FormControlLabel, Popover, Radio, RadioGroup, TextField } from "@mui/material";
import styles from '../page.module.css';
import { AddCustomerStyle, BoxStyle, ButtonStyle, PopoverStyle, textfield } from "./page.style";
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useEffect, useState } from "react";
import axios from 'axios';


export default function Customers() {
  const [ Name, setName ] = useState('');
  const [ Age, setAge ] = useState('');
  const [ Gender, setGender ] = useState('');
  const [ Mobile, setMobile ] = useState('');
  const [ edit, setEdit ] = useState(null);
  const [showLabelname, setShowLabelname] = useState(true);
  const [showLabelage, setShowLabelage] = useState(true);
  const [showLabelmobile, setShowLabelmobile] = useState(true);
  const [customers, setCustomers] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  console.log('customers', customers)
  const data = Array.isArray(customers) ? customers : [];

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const resetFields = () => {
    setName('');
    setAge('');
    setGender('');
    setMobile('');
  };


  const handleClose = () => {
    setAnchorEl(null);
    setEdit(null); // Reset edit mode
    resetFields(); // Clear fields
  };

  const handleAddCustomer = async () => {
    if (!Name || !Age || !Gender || !Mobile) {
      alert('Please fill all fields');
      return;
    }
  
    try {
      const response = await axios.post('/api/createCustomer', {  // Ensure the endpoint matches
        name: Name,
        age: Age,
        gender: Gender,
        mobile: Mobile,
      });
      
      if (response.status === 201) {
        // alert('Customer added successfully');
        resetFields();
        setAnchorEl(null); // Close the Popover
        fetchData();
      }
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Failed to add customer');
    }
  };

  const handleUpdateCustomer =  async () => {
    if (!Name || !Age || !Gender || !Mobile || !edit) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await axios.put('/api/updateCustomer', {
        id: edit,
        name: Name,
        age: Age,
        gender: Gender,
        mobile: Mobile,
      });

      if (response.status === 201) {
        fetchData();
        handleClose();
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Failed to update customer');
    }

  };

  const handleEditCustomer = (item: any, event: any) => {
    console.log('edit', edit);
    console.log('item', item);
    
    setAnchorEl(event.currentTarget);
    setEdit(item._id);
    setName(item.name);
    setAge(item.age);
    setGender(item.gender);
    setMobile(item.mobile);    
  };

  const handleDeleteCustomer = async (id: any) => {
    try {
      const response = await axios.delete('/api/deleteCustomer', {
        data: { id }, // Pass the customer ID in the request body
      });
      
      if (response.status === 200) {
        // alert('Customer deleted successfully');
        fetchData();
        handleClose();
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Failed to delete customer');
    }
  };
  

  const fetchData = async () => {
    axios.get('/api/getCustomers')
    .then(response => setCustomers(response.data))
    .catch(error => console.error(error));
  }

  useEffect(() => {
    fetchData();
  }, []);
    
  return (
    <div className={styles.page}>
      <Typography variant="h3" sx={{p:'12px 20px'}}>
        Customer List
      </Typography>
      <Button sx={{...ButtonStyle, bgcolor:'green', "&:hover": { backgroundColor: "green" }, mb:'20px' }} onClick={handleClick}>Add Customer</Button>
      <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorReference="anchorPosition" anchorPosition={{top: 350, left: 740}} anchorOrigin={{vertical:'center', horizontal:'center'}} transformOrigin={{vertical:'center', horizontal:'center'}} sx={PopoverStyle}>
        <Box sx={{display:'flex', flexDirection: 'column',  alignItems: 'center', padding:'20px', bgcolor:'#FADA7A'}}>
        <Typography variant="h5">Add Customer</Typography>
        <Box sx={BoxStyle}>
          <Typography variant="h6" sx={AddCustomerStyle}>Name  :</Typography>
          <TextField sx={textfield} label={showLabelname && !Name ? "Enter Your Name" : ""} value={Name} onChange={(e) => setName(e.target.value)} onFocus={() => setShowLabelname(false)} onBlur={() => setShowLabelname(true)} />
        </Box>
        <Box sx={{...BoxStyle, mt:'20px'}}>
          <Typography variant="h6" sx={AddCustomerStyle}>Age  :</Typography>
          <TextField sx={textfield} label={showLabelage && !Age ? 'Enter Your Age' : ""} value={Age} onChange={(e) => setAge(e.target.value)} onFocus={() => setShowLabelage(false)} onBlur={() => setShowLabelage(true)} />
        </Box>
        <Box sx={{...BoxStyle, mt:'20px'}}>
          <Typography variant="h6" sx={{ width:'140px', pt:'4px'}}>Gender  :</Typography>
          <FormControl>
            <RadioGroup value={Gender} onChange={(e) => setGender(e.target.value)}>
              <Box sx={{display:'flex', flexDirection:'row', mr:'30px'}}>
              <FormControlLabel value='Male' control={<Radio />} label='Male'></FormControlLabel>
              <FormControlLabel value='Female' control={<Radio />} label='Female'></FormControlLabel>
              </Box>
            </RadioGroup>
          </FormControl>
        </Box>
        <Box sx={{...BoxStyle, mt:'20px'}}>
        <Typography variant="h6" sx={AddCustomerStyle}>Mobile No  :</Typography>
        <TextField sx={textfield} label={showLabelmobile && !Mobile ? 'Enter Your Number' : ""} value={Mobile} onChange={(e) => setMobile(e.target.value)} onFocus={() => setShowLabelmobile(false)} onBlur={() => setShowLabelmobile(true)}/>
        </Box>
        <Box sx={BoxStyle}>
         <Button sx={{...ButtonStyle, bgcolor:'green', "&:hover": { backgroundColor: "green" }, mt:"20px"}}   onClick={() => { edit === null ? handleAddCustomer() : handleUpdateCustomer() }}>{edit === null ? 'Add' : 'Update'}</Button> 
        </Box>
        </Box>
      </Popover>
      <Box sx={{width:'800px'}}>
        <Table style={{ border: '2px solid #D1D1D1', borderCollapse: 'collapse' }}>
            <TableHead sx={{color:'white', bgcolor:'#98D8EF'}}>
              <TableRow>
                <TableCell style={{ border: '2px solid black', fontWeight:'bold' }}>S.NO</TableCell>
                <TableCell style={{ border: '2px solid black', fontWeight:'bold' }}>Name</TableCell>
                <TableCell style={{ border: '2px solid black', fontWeight:'bold' }}>Age</TableCell>
                <TableCell style={{ border: '2px solid black', fontWeight:'bold' }}>Gender</TableCell>
                <TableCell style={{ border: '2px solid black', fontWeight:'bold' }}>Mobile</TableCell>
                <TableCell style={{ border: '2px solid black', fontWeight:'bold' }}>Edit/Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item: any, index : any) => (
                <TableRow key={item.name}> 
                  <TableCell style={{ border: '2px solid black' }}>{index + 1}</TableCell>
                  <TableCell style={{ border: '2px solid black' }}>{item.name}</TableCell>
                  <TableCell style={{ border: '2px solid black' }}>{item.age}</TableCell>
                  <TableCell style={{ border: '2px solid black' }}>{item.gender}</TableCell>
                  <TableCell style={{ border: '2px solid black' }}>{item.mobile}</TableCell>
                  <TableCell style={{ border: '2px solid black' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                      <Button sx={{ ...ButtonStyle, bgcolor: 'orange', "&:hover": { backgroundColor: "orange" }, }} startIcon={<ModeEditOutlineTwoToneIcon />} onClick={(e) => handleEditCustomer(item, e)}>Edit</Button>
                      <Button sx={{ ...ButtonStyle, bgcolor: 'red', "&:hover": { backgroundColor: "red" }, }} startIcon={<DeleteTwoToneIcon />} onClick={(() => handleDeleteCustomer(item._id))}>Delete</Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
      </Box>
    </div>
  );
}