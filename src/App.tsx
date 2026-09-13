import { Route, Routes } from 'react-router-dom'
import { Checkout } from './pages/Checkout'
import { Intake } from './pages/Intake'
import { Landing } from './pages/Landing'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/intake" element={<Intake />} />
    </Routes>
  )
}
