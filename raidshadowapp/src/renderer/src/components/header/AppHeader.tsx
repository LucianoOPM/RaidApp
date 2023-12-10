import { useState } from 'react'
import { Link } from 'react-router-dom'
// import '../styles/registerForm.css'
const NavHeader = (): JSX.Element => {
  const [userActive, setUserActive] = useState(true)
  const [criteriaActive, setCriteriaActive] = useState(false)

  const activeStyle =
    'px-11 py-2 mb-px font-semibold text-white border-b-2 w-1/2 border-blue-400 text-center rounded-t opacity-100'
  const inactiveStyle = 'px-11 py-2 font-semibold text-white rounded-t w-1/2 text-center opacity-70'

  return (
    <header className="bg-indigo-600 rounded-md">
      <div className="mx-auto rounded">
        <ul id="tabs" className="inline-flex w-full px-1 pt-2">
          <Link
            className={userActive ? activeStyle : inactiveStyle}
            to={'/'}
            onClick={() => {
              setCriteriaActive(false)
              setUserActive(true)
            }}
          >
            Usuarios
          </Link>
          <Link
            className={criteriaActive ? activeStyle : inactiveStyle}
            to={'/criteria'}
            onClick={() => {
              setUserActive(false)
              setCriteriaActive(true)
            }}
          >
            Criterios Evaluación
          </Link>
        </ul>
      </div>
    </header>
  )
}

export default NavHeader
