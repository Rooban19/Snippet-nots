import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Details = () => {
  const location = useLocation();
  return (
    <div>
      <h1>{location.state.title}</h1>
      <p>{location.state.desc}</p>
    </div>
  );
};

export default Details;
