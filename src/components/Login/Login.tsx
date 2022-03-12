import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props: any) => {
	const [enteredEmail, setEnteredEmail] = useState<any>('');
	const [emailIsValid, setEmailIsValid] = useState<any>();
	const [enteredPassword, setEnteredPassword] = useState<any>('');
	const [passwordIsValid, setPasswordIsValid] = useState<any>();
	const [formIsValid, setFormIsValid] = useState<boolean>(false);
  
  useEffect(() => {
    return () => {
      console.log('Checking the form validity...');

      // we create our timeout value and then we set the debounce time for the function to get hit below
      const setTimeoutSubscription = setTimeout(() => {
        setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);
      }, 500);

      // We have to clear the timeout till the last keystroke or change is made
      return (): void => {
        console.log('cleanup')
        clearTimeout(setTimeoutSubscription);
      };
    }
  }, [enteredEmail, enteredPassword]); // We set the parameters that are going to be listened to before execution
  

	const emailChangeHandler = (event: any) => {
		setEnteredEmail(event.target.value);

		setFormIsValid(
			event.target.value.includes('@') && enteredPassword.trim().length > 6
		);
	};

	const passwordChangeHandler = (event: any) => {
		setEnteredPassword(event.target.value);

		setFormIsValid(
			event.target.value.trim().length > 6 && enteredEmail.includes('@')
		);
	};

	const validateEmailHandler = () => {
		setEmailIsValid(enteredEmail.includes('@'));
	};

	const validatePasswordHandler = () => {
		setPasswordIsValid(enteredPassword.trim().length > 6);
	};

	const submitHandler = (event: any) => {
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
