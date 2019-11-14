import React from 'react'
import { Div } from 'styled'
import styled from 'styled-components'
import { Navbar } from 'shared'

const App = () => {
  return (
    // <Div>
    //   <Div>Hello</Div>
    //   <Div>
    //     <button onClick={() => triggerTheme()}>trigger</button>
    //   </Div>
    // </Div>
    <Page>
      <Navbar />
      <Content>Hello there</Content>
    </Page>
  )
}

export default App

const Page = styled(Div)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Content = styled(Div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
`
