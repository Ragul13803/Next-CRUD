import { Padding } from "@mui/icons-material"

export const ButtonStyle = {
    color:'white', 
    textTransform:'none', 
    "&:focus": {outline: 'none'},
    borderRadius:'6px',
}
 
export const AddCustomerStyle = {
    width:'120px', 
    pt:'10px'
}

export const textfield = {
    '& .MuiOutlinedInput-root': {
      mt:'6px',
      borderRadius: '12px',
      height: '40px',
      '& fieldset': {
        border: '1px solid #D1D1D1',
      },
      '&:hover fieldset': {
        border: '1px solid black',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid black',
      },
    }
}
  
export const BoxStyle = {
    display:'flex', 
    flexDirection:'row',
}

export const PopoverStyle = {
    color:'#D9D9D9', 
    borderRadius:'10px',
    backdropFilter:'blur(4px)',
}
  