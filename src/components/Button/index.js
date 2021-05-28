import React from 'react';
import Button from '@material-ui/core/Button';

import './index.css'

export default function CustomButton({ children, ...props }) {
    return (
        <Button color="secondary" {...props}>
            {children}
        </Button>
    );
};
