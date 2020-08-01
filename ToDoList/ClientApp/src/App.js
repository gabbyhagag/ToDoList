import React, { Component } from 'react';
import { Route } from 'react-router';

import { Home } from './components/pages/Home';
import { NotFound } from './components/pages/NotFound';

import './custom.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <React.Fragment>
                <Route exact path='/' component={Home} />
                <Route path='/not-found' component={NotFound} />
            </React.Fragment>
        );
    }
}
