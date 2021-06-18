import { useState, useRef, useEffect } from "react";
import Cards from "react-credit-cards";
import { TextField, FormControl, Typography, Grid, makeStyles } from '@material-ui/core';

import "react-credit-cards/es/styles-compiled.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
    width: '50%',
    margin: 'auto',
  },
  textFields: {
    margin: '7px 0',
  },
  summaryContainer: {
    marginTop: '10px'
  },
  summary: {
    display: 'flex',
    fontSize: '16px',
    marginTop: '8px',
    fontWeight: '600',
  },
  price: {
    display: 'flex',
    fontSize: '20px',
    fontWeight: '700',
    marginTop: '16px',
    marginBottom: '12px'
  },
  amount: {
    fontWeight: '700',
    marginLeft: '10px',
  },
}));

const PaymentDataForm = ({ cardData, setCardData, calculateTotalPrice, defaultValue, errors }) => {
  const classes = useStyles();
  const [focus, setFocus] = useState("");

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const ref = useRef(null);

  return (
    <div>
      <Cards
        number={cardData.number}
        name={cardData.name}
        expiry={cardData.expiry}
        cvc={cardData.cvc}
        focused={focus}
      />
      <FormControl className={classes.formControl}>
        <TextField 
          onFocus={(e) => setFocus(e.target.name)}
          className={classes.textFields}
          value={cardData.number}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
            if(onlyNums.length <= 16) {
              setCardData({...cardData, number: onlyNums});
            }
          }}
          name="number"
          label="Card Number"
          placeholder="Card Number"
          variant="outlined"
          helperText={errors?.number ? errors.number : ""}
          error={errors?.number && Boolean(errors.number)}
          autoFocus
        />
        <TextField
          name="name"
          label="Name"
          placeholder="Name"
          multiline
          className={classes.textFields}
          value={cardData.name}
          onChange={(e) => setCardData({...cardData, name: e.target.value})}
          onFocus={(e) =>  setFocus(e.target.name)}
          helperText={errors?.name ? errors.name : ""}
          error={errors?.name && Boolean(errors.name)}
          required
          variant="outlined"
        />
        <TextField 
          name="expiry"
          value={cardData.expiry}
          className={classes.textFields}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
            if(onlyNums.length <= 4) {
              setCardData({...cardData, expiry: onlyNums});
            }
          }}
          label="MM/YY"
          placeholder="MM/YY"
          onFocus={(e) => setFocus(e.target.name)}
          helperText={errors?.expiry ? errors.expiry : ""}
          error={errors?.expiry && Boolean(errors.expiry)}
          variant="outlined"
        />
        <TextField
          className={classes.textFields}
          onFocus={(e) =>  setFocus(e.target.name)}
          value={cardData.cvc}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
            if(onlyNums.length <= 3) {
              setCardData({...cardData, cvc: onlyNums});
            }
          }}
          helperText={errors?.cvc ? errors.cvc : ""}
          error={errors?.cvc && Boolean(errors.cvc)}
          name="cvc"
          label="CVC"
          placeholder="CVC"
          required
          variant="outlined"
        />
        <Grid className={classes.summaryContainer}>
          <Typography className={classes.summary}>Duration: <span className={classes.amount}>{`${defaultValue.duration} Months`}</span></Typography>
          <Typography className={classes.summary}>Gigabytes: <span className={classes.amount}>{`${defaultValue.gigabytes} GB`}</span></Typography>
          <Typography className={classes.summary}>Upfront Paymant: <span className={classes.amount}>{defaultValue.upfront === 'yes' ? `${defaultValue.upfront} (-10 %)` : defaultValue.upfront}</span></Typography>
          <Typography className={classes.price}>Total Price: <span className={classes.amount}>{`${calculateTotalPrice} $`}</span></Typography>
        </Grid>
      </FormControl>
    </div>
  );
}

export default PaymentDataForm;
