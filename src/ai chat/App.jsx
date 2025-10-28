import AiAgentPage from './pages/AiAgentPage'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from '../home_page/components/Navbar'


function App() {
  return (
    
    <ThemeProvider>
      <Navbar />
      <AiAgentPage />
     
    </ThemeProvider>
  )
}

export default App
