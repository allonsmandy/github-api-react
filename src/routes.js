import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from './pages/Main'
import Repository from './pages/Repository'
import User from './pages/User'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/repositorio/:repositorio" exact component={Repository} />
                <Route path="/usuario/:user" exact component={User} />
            </Switch>
        </BrowserRouter>
    )
}
