import React from 'react'
import Navbar from 'shared/Navbar'
import { Div } from 'styled'
import styled from 'styled-components'
import { Route } from 'react-router-dom'

const NavRoute = props => (
  <Page>
    <Navbar />
    <Content>
      <Route {...props} />
    </Content>
  </Page>
)

export default NavRoute

const Page = styled(Div)`
  height: 100%;
  width: fill-available;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  overflow: auto;
`

const Content = styled(Div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  margin-top: 100px;
`
