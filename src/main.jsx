import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from './layouts/MainLayout'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import Studios from './pages/Studios/Studios'
import Bookings from './pages/Bookings/Bookings'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="studios" element={<Studios/>} />
          <Route path="bookings" element={<Bookings/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
