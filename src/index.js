import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import {
  ThemeContextConsumer,
  ThemeContextProvider
} from 'context/themeContext'

const vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)

const RootHTML = () => {
  return (
    <ThemeContextProvider>
      <ThemeContextConsumer>
        {({ theme }) => (
          <StyledThemeProvider theme={theme}>
            <App />
          </StyledThemeProvider>
        )}
      </ThemeContextConsumer>
    </ThemeContextProvider>
  )
}

ReactDOM.render(<RootHTML />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
