// Components
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Pages
import AlbumsPage from '../pages/AlbumsPage'
import NotFoundPage from '../pages/NotFoundPage'

// Custom routes
import NavRoute from './NavRoute'

const Routes = () => (
  <Switch>
    <NavRoute path='/' exact={true} component={AlbumsPage} />
    <Route path='*' exact={true} component={NotFoundPage} />
    {/* <Route path='/404' exact={true} component={NotFoundPage} /> */}
  </Switch>
)

export default Routes
