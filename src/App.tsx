import './App.css'
import AuthLayout from './components/auth/AuthLayout.tsx'
import Login from './components/auth/Login.tsx'
import { Route, Routes } from "react-router"
import SignUp from './components/auth/SignUp.tsx'
import Dashboard from './components/dashboard/Dashboard.tsx'
import Graph from './components/graph/Graph.tsx'
import Home from './components/Home.tsx'
import NotFound from './components/Not-Found.tsx'

function App() {

  return (
    <div className='w-full h-full'>
      <div className="grid-background"></div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='sign-up' element={<SignUp />} />
        </Route>
        <Route element={<Home />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='graph' element={<Graph />} />
        </Route>
        <Route path='*' element={<NotFound />} ></Route>
      </Routes>
    </div>
  )
}

export default App
