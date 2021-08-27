import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [OTP, setOTP] = useState();

  console.log(email);
  console.log(OTP);

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
      <form className='add-form' onSubmit={() => history.push('/snippets')}>
        <div className='form-control'>
          <label>Email id</label>
          <input
            type='email'
            placeholder='Enter your email id'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label>OTP</label>
          <input
            type='number'
            placeholder='Enter the OTP'
            value={OTP}
            onInput={maxLengthCheck}
            maxLength='5'
            onChange={(e) => setOTP(e.target.value)}
          />
        </div>

        <input type='submit' value='Login' className='btn btn-block' />
      </form>
    </div>
  );
};

export default Login;
