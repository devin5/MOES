import React from "react"
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
export default function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://en.wikipedia.org/wiki/Anonymous_(group)">
          Ashing Pines
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }