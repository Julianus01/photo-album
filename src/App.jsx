import React, { useContext } from 'react'
import { Div } from 'styled'
import ThemeContext from './context/themeContext'

const App = () => {
  const {
    actions: { triggerTheme }
  } = useContext(ThemeContext)

  return (
    <Div>
      <Div>Hello</Div>
      <Div>
        <button onClick={() => triggerTheme()}>trigger</button>
      </Div>
    </Div>
  )
}

export default App
