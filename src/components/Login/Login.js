import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

/*
useEffect(()=>{
  console.log('RUNNING EFFECT')
})

runs when the component FIRST mounts & also for EVERY STATE UPDATE

useEffect(()=>{
  console.log('RUNNING EFFECT')
},[])

runs ONLY ONCE when the component FIRST mounted

useEffect(()=>{
  console.log('RUNNING EFFECT')
},[enteredPassword])

runs when the component FIRST mounts & whenever was reevaluated or whenever the enteredPassword changes it runs

seEffect(()=>{
  console.log('RUNNING EFFECT')

  return ()=>{
    console.log('EFFECT CLEANUP')
  }
},[enteredPassword])

if it has depedency like enteredPassword, then RUNNING EFFECT runs at the begining and 
EFFECT CLEANUP runs before the RUNNING EFFECT, whenever the enteredPassword changes.

useEffect(()=>{
  console.log('RUNNING EFFECT')

  return ()=>{
    console.log('EFFECT CLEANUP')
  }
},[])

without dependency, the RUNNING EFFECT runs at the begining ONCE &
EFFECT CLEANUP runs at the end when the component is removed, i.e. when we moved from LOGIN to HOME component

*/



  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
