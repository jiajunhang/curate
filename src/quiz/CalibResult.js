import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CalibResult = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <>
      <h2>Result ID: {id}</h2>
      <h3>Completed submission, please fill in the details in the <a href="https://forms.office.com/r/5YZVSvyAFk">form</a> provided.</h3>
        You will need to provide the following:
        <ul>Name: YOUR NAME</ul>
        <ul>Student Number: NUS Matric Number</ul>
        <ul>Email: NUS email</ul>
        <ul>Mobile: Mobile Number</ul>
        <ul>Result ID: {id}</ul>
      <h3>**NOTE**: For #5 in the form, fill in Result ID (i.e. {id}, NOT session ID that was created from the start!) </h3>
    </>
  );
}

export default CalibResult;