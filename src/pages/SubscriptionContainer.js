import { useState, useEffect } from 'react';
import { Paper, Grid, Stepper, Step, StepLabel, Typography, Button, makeStyles } from '@material-ui/core';
import axios from 'axios';

import SubscriptionParameters from '../components/SubscriptionParameters/SubscriptionParameters';
import PaymentDataForm from '../components/PaymentDataForm/PaymentDataForm';
import Confirmation from '../components/Confirmation/Confirmation';

import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    marginTop: '20px',
    margin: 'auto',
    padding: '20px',
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '90%',
    margin: 'auto',
  },
  done: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  complated: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'green',
  },
}));

const getSteps = () => {
  return ['Select subscription parameters', 'Payment data', 'Confirmation'];
};

const SubscriptionContainer = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState({});
  const [defaultValue, setDefaultValue] = useState({
    duration: 12,
    gigabytes: 5,
    upfront: 'no',
  });
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });
  const [errors, setErrors] = useState({});
  const [confirmData, setConfirmData] = useState({
    email: '',
    checked: false,
  });

  const steps = getSteps();

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get('https://cloud-storage-prices-moberries.herokuapp.com/prices');
      let durationsArr = [];

      res.data.subscription_plans.forEach(item => {
        durationsArr.push({ value: item.duration_months, name: ` Months`, priceUsdPerGb: item.price_usd_per_gb });
      });

      setData({
        duration: durationsArr,
        gigabytes: [{value: 5, name: 'GB'}, {value: 10, name: 'GB'}, {value: 50, name: 'GB'}],
        upfront: [{value: 'no'}, {value: 'yes'}]}
      );
    }
    fetchData();
  }, []);

  const handleNext = () => {
    let errors = {};
    if (activeStep === 1) {
      if (cardData.number.trim().length === 0 || cardData.number.trim().length < 16) {
        errors.number = "Card number is Requiered Field";
      } 
      if (cardData.name.trim().length === 0) {
        errors.name = "Name is Requiered Field";
      }
      if (cardData.expiry.trim().length === 0 || cardData.expiry.trim().length < 4) {
        errors.expiry = "Expiry is Requiered Field";
      }
      if (cardData.cvc.trim().length === 0 || cardData.cvc.trim().length < 3) {
        errors.cvc = "CVC is Requiered Field";
      }
    }
    if(Object.keys(errors).length > 0) {
      return setErrors(errors);
    } else { 
      setErrors('')
      return setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setDefaultValue(pre => ({...pre, [name]: value}))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validEmailRegex = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

    if(!validEmailRegex.test(confirmData.email)) {
      setErrors(pre => ({...pre, email: 'Not Valid Email'}));
    }
    console.log(confirmData.checked)
    if(validEmailRegex.test(confirmData.email)) {
      let data = {
        parameters: defaultValue,
        paymantData: cardData,
        comfirmation: confirmData,
      }
      console.log(data);
      try {
        axios.post('https://httpbin.org/post', data);
      } catch (err) {
        console.log(err);
      }
      setErrors(pre => ({...pre, email: ''}));
      return setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const calculateTotalPrice = () => {
    const perGbPriceByMonthObj = data?.duration?.find(item => item.value === defaultValue.duration) || {};
    const price = perGbPriceByMonthObj?.priceUsdPerGb * defaultValue.gigabytes;
    const reducedPrice = price * 10 / 100;

    if(defaultValue.upfront === 'yes') {
      return price - reducedPrice;
    } else {
      return price;
    }
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <SubscriptionParameters data={data} handleSelectChange={handleSelectChange} defaultValue={defaultValue} calculateTotalPrice={calculateTotalPrice()} />;
      case 1:
        return <PaymentDataForm calculateTotalPrice={calculateTotalPrice()} defaultValue={defaultValue} cardData={cardData} setCardData={setCardData} errors={errors} />;
      case 2:
        return <Confirmation calculateTotalPrice={calculateTotalPrice()} defaultValue={defaultValue} setConfirmData={setConfirmData} checked={confirmData.checked} errors={errors} />;
      default:
        return;
    };
  };

  return (
    <Paper className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <Grid className={classes.done}>
            <CheckIcon style={{ color: 'green', fontSize: '40px' }} />
            <Typography className={classes.complated}>All steps completed</Typography>
          </Grid>
        ) : (
          <>
            <Grid className={classes.instructions}>{getStepContent(activeStep)}</Grid>
            <div className={classes.buttonContainer}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={activeStep === 2 ? handleSubmit : handleNext}>
                {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
              </Button>
            </div>
          </>
        )}
      </div>
    </Paper>
  );
};

export default SubscriptionContainer;
