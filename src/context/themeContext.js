import React, { createContext, useState } from 'react'
import { lightTheme, darkTheme } from 'theme'
import fp from 'lodash/fp'

const getTheme = () => {
  const localStorageTheme = JSON.parse(localStorage.getItem('theme'))

  if (fp.get('name')(localStorageTheme) === 'light') {
    document.body.style = 'background: white;'
  } else {
    document.body.style = 'background: black;'
  }

  return localStorageTheme ? localStorageTheme : lightTheme
}

const ThemeContext = createContext()

const ThemeContextConsumer = ThemeContext.Consumer
const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme())

  const triggerTheme = () => {
    if (fp.get('name')(theme) === 'light') {
      setTheme(darkTheme)
      localStorage.setItem('theme', JSON.stringify(darkTheme))
      return
    }

    setTheme(lightTheme)
    localStorage.setItem('theme', JSON.stringify(lightTheme))
    return
  }

  return (
    <ThemeContext.Provider value={{ theme, actions: { triggerTheme } }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContextConsumer }
export { ThemeContextProvider }
export default ThemeContext
