import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import CardChartHistory from '../components/cardChartHistory'

const HistoryTransactionPage = () => {
  return (
    <div className='bg-gray-100'>
      <div>
        <Navbar />
      </div>

      <div className="px-28 pt-28 h-screen">
        <h1 className='mb-4 font-bold text-isPrimary text-2xl'>History Transaction</h1>
        <CardChartHistory />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  )
}

export default HistoryTransactionPage