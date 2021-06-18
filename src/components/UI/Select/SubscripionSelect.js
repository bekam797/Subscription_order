import { useState } from 'react';
import { FormControl, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 137,
    backgroundColor: 'transparent',
    border: '1px solid #D1D1D6',
    borderRadius: '4px',
    borderRight: '1px solid #E8E8EA',
  },
  currImg: {
    width: 32,
    height: 32,
  },
  text: {
    paddingRight: '5px',
    fontSize: '16px',
  },
  menuItem: {
    margin: 0,
  },
  select: {
    marginTop: '0 !important',
    '&:before': {
      borderBottom: 'none',
    },
    '&:after': {
      borderBottom: 'none',
    },
    '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before': {
      borderBottom: 'none',
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent',
    },
    '& .MuiSelect-select.MuiSelect-select.MuiSelect-select': {
      padding: '16px 20px',
    },
  },
  input: {
    textAlign: 'left'
  }
}));

const SubscriptionSelect = ({ data = [], style, selectStyle, defaultValue, handleSelectChange, name = "" }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl style={{...style}} className={classes.formControl}>
      <InputLabel htmlFor="open-select" />
      <Select
        name={name}
        value={defaultValue[name]}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        onChange={handleSelectChange}
        className={classes.select}
        style={{...selectStyle}}
        inputProps={{
          className: classes.input,
        }}
      >
        {data?.map((item, key) => (
          <MenuItem value={item.value} key={key} className={classes.menuItem}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Typography className={classes.text}>{item.value}</Typography>
              <Typography className={classes.text}>{item.name}</Typography>
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SubscriptionSelect;
