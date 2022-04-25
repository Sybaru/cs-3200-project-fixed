import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Temp thingy</Title>
      <Typography component="p" variant="h4">
        temp
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        temp
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View 
        </Link>
      </div>
    </React.Fragment>
  );
}