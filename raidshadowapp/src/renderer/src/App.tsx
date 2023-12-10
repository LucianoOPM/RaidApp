import NavHeader from './components/header/AppHeader'
import { HashRouter, Route, Routes } from 'react-router-dom'
import UserList from './views/UserList'
import UserInformation from './views/UserInformation'

function App(): JSX.Element {
  return (
    <div>
      <HashRouter>
        <NavHeader />
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserInformation />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
