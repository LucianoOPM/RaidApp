import NavHeader from './components/header/AppHeader'
import { HashRouter, Route, Routes } from 'react-router-dom'
import UserList from './views/UserList'
import UserInformation from './views/UserInformation'
import CriteriasList from './views/CriteriasList'
import CriteriaInfo from './views/CriteriaInfo'

function App(): JSX.Element {
  return (
    <div>
      <HashRouter>
        <NavHeader />
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserInformation />} />
          <Route path="/criterias" element={<CriteriasList />} />
          <Route path="/criteria/:id" element={<CriteriaInfo />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
