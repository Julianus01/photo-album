// Components
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// Pages
import AlbumsPage from '../pages/AlbumsPage'
import AlbumPage from '../pages/AlbumPage'
import NotFoundPage from '../pages/NotFoundPage'

// Custom routes
import NavRoute from './NavRoute'

const Routes = () => (
  <Switch>
    <NavRoute path="/" exact={true} component={() => <Redirect to="/albums" />} />
    <NavRoute path="/albums" exact={true} component={AlbumsPage} />
    <NavRoute path="/albums/:name" exact={true} component={AlbumPage} />

    <Route path="*" exact={true} component={NotFoundPage} />
  </Switch>
)

export default Routes
