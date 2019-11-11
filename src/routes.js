import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from './pages/Main'
import Repository from './pages/Repository'
import User from './pages/User'
import Followers from './pages/Followers'
import Following from './pages/Following'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/repositorio/:repositorio" exact component={Repository} />
                <Route path="/usuario/:user" exact component={User} />
                <Route path="/usuario/:user/seguidores" exact component={Followers} />
                <Route path="/usuario/:user/seguindo" exact component={Following} />
            </Switch>
        </BrowserRouter>
    )
}
