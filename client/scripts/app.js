
// Dependencies
import 'babel-polyfill';
import '../styles/app.css';
import React from 'react';
import { render } from 'react-dom';

// Components
import App from '../../universal/containers/App';

render(<App />, document.getElementById('root'));
