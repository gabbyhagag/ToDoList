import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import theme from './theme/theme';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <BrowserRouter basename={baseUrl}>
            <App />
        </BrowserRouter>
    </ThemeProvider>,
    rootElement
);

registerServiceWorker();
