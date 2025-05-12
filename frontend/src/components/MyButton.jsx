import React from 'react'
import Button from '@mui/material/Button';

function MyButton({label}) {
  return (
    <>
    <Button variant="outlined">{label}</Button>
    </>
  )
}

export default MyButton