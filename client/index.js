import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import styles from './css/styles.css';
const path = require('path');


render(
    <App />,
    document.getElementById('root')
  );