import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CalibResult = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <>
      <h3>Result ID: ${id}</h3>
      <h3>Completed submission. Pls update the Result ID to Prof. Tan.</h3>
    </>
  );
}

export default CalibResult;