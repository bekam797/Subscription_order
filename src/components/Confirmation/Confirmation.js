import { makeStyles, Grid, Typography, TextField, Checkbox } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    width: '85%',
    marginTop: '40px',
  },
  emailText: {
    margin: 'auto',
    paddingBottom: '10px',
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
  textField: {
    maxWidth: '350px',
    width: '100%',
    marginBottom: '10px',
  },
  termsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '50px',
  },
  summaryContainer: {
    marginTop: '10px',
  }
}));

const Confirmation = ({ calculateTotalPrice, defaultValue, setConfirmData, checked, errors }) => {
  const classes = useStyles();
  
  return (
    <>
      <Grid className={classes.root}>
        <Grid>
          <Typography className={classes.emailText}>Enter Email *</Typography>
          <TextField
            className={classes.textField}
            type="email"
            name="email"
            label="Email"
            onChange={(e) => setConfirmData(pre => ({...pre, email: e.target.value}))}
            helperText={errors?.email ? errors.email : ""}
            error={errors?.email && Boolean(errors.email)}
            required
            variant="outlined"
          />
        </Grid>
        <Grid>
          <Grid className={classes.summaryContainer}>
            <Typography className={classes.summary}>Duration: <span className={classes.amount}>{`${defaultValue.duration} Months`}</span></Typography>
            <Typography className={classes.summary}>Gigabytes: <span className={classes.amount}>{`${defaultValue.gigabytes} GB`}</span></Typography>
            <Typography className={classes.summary}>Upfront Paymant: <span className={classes.amount}>{defaultValue.upfront === 'yes' ? `${defaultValue.upfront} (-10 %)` : defaultValue.upfront}</span></Typography>
            <Typography className={classes.price}>Total Price: <span className={classes.amount}>{`${calculateTotalPrice} $`}</span></Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.termsContainer}>
        <Checkbox
          checked={checked}
          onChange={(e) => setConfirmData(pre => ({...pre, checked: e.target.checked}))}
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <Typography>Terms and conditions *</Typography>
      </Grid>
    </>
  );
};

export default Confirmation;
