import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [OTP, setOTP] = useState();
  const [sentOTP, setSentOTP] = useState(false);
  console.log(email);
  console.log(OTP);

  const login = async () => {
    console.log('Logging in ....');

    const response = await fetch(`${api}${sentOTP ? 'login/' : 'otp/'}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, otp: OTP }),
    });

    const resData = await response.json();
    console.log(resData);
    if (response.status === 200) {
      setSentOTP(true);
      if (sentOTP) {
        history.push('/snippets');
      }
    }
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form
        className='add-form'
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}>
        <div className='form-control'>
          <label>Email id</label>
          <input
            type='email'
            placeholder='Enter your email id'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {sentOTP && (
          <div className='form-control'>
            <label>OTP</label>
            <input
              type='number'
              placeholder='Enter the OTP'
              value={OTP}
              onInput={maxLengthCheck}
              maxLength='4'
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>
        )}

        <input
          type='submit'
          value={sentOTP ? 'Login' : 'Sent OTP'}
          className='btn btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
