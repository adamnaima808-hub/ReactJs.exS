
import { useState } from 'react'
import Greeting from './Greeting.jsx'
import LanguageContext from './LanguageContext.js'

function App() {
  const [language, setLanguage] = useState('en')

  function toggleLanguage() {
    setLanguage((currentLanguage) => (currentLanguage === 'en' ? 'es' : 'en'))
  }

  return (
    <LanguageContext.Provider value={language}>
      <main className="language-selector">
        <Greeting />
  
        <button className="language-toggle" onClick={toggleLanguage} type="button">
          Switch to {language === 'en' ? 'Spanish' : 'English'}
        </button>
      </main>
    </LanguageContext.Provider>
  )
}

export default App
