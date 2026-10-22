import { useContext } from 'react'
import LanguageContext from './LanguageContext.js'

const messages = {
  en: 'Hello!',
  es: '¡Hola!',
}

function Greeting() {
  const language = useContext(LanguageContext)

  return <h1>{messages[language]}</h1>
}

export default Greeting
