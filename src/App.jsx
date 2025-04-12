import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductListPage from './components/client/Product/ProductListPage'
import ProductDetailPage from './components/client/Product/ProductDetailPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  )
}

export default App