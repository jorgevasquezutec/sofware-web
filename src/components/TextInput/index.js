import React from 'react';
import TextField from '@material-ui/core/TextField';

import './index.css'

export default function CustomTextInput({ children, ...props }) {
    return (
        <TextField id="outlined-basic" variant="outlined" {...props} />
    );
};
