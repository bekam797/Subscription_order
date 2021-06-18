import { Typography, Grid, makeStyles } from '@material-ui/core';
import SubscriptionSelect from "../UI/Select/SubscripionSelect";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    margin: 'auto',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '50px',
  },
  titles: {
    marginTop: '5px',
    marginBottom: '10px'
  },
  summary: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
  },
  amount: {
    fontWeight: '900',
    marginLeft: '10px',
  },
}));

const SubscriptionParameters = ({ data = [], handleSelectChange, defaultValue, calculateTotalPrice }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Grid className={classes.container}>
        <Typography className={classes.titles}>Duration</Typography>
        <SubscriptionSelect 
          name={Object.keys(defaultValue)[0]}
          data={data?.duration} 
          handleSelectChange={handleSelectChange} 
          defaultValue={defaultValue} 
        />
        <Typography className={classes.titles}>Gigabytes</Typography>
        <SubscriptionSelect 
          name={Object.keys(defaultValue)[1]} 
          data={data?.gigabytes} 
          handleSelectChange={handleSelectChange} 
          defaultValue={defaultValue} 
        />
        <Typography className={classes.titles}>Upfront Payment</Typography>
        <SubscriptionSelect 
          name={Object.keys(defaultValue)[2]}
          data={data?.upfront} 
          handleSelectChange={handleSelectChange} 
          defaultValue={defaultValue} 
        />
      </Grid>
      <Typography className={classes.summary}>Total Price: <span className={classes.amount}>{`${calculateTotalPrice} $`}</span></Typography>
    </Grid>
  );
};

export default SubscriptionParameters;
