import './scss/App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BaseLayout } from './pages/BaseLayout'
import { ProductsCatalog } from './pages/ProductsCatalog'
import { NotFound } from './pages/NotFound'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Profile } from './pages/Profile'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/catalog' element={
          <BaseLayout>
            <ProductsCatalog></ProductsCatalog>
          </BaseLayout>
        }></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
