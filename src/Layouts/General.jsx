import React from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';



import 'react-toastify/dist/ReactToastify.css';

// Common components
import Header from '../components/Header';

const GeneralLayout = ({ children }) => {
  const count = useSelector((state) => state.counter.value )
  return (
    <div className='w-full h-screen bg-white relative'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <div className='text-center'>
        {count}
      </div>

      <div className='w-[800px] m-auto'>
        {children}
      </div>
    </div>
  )
}

export default GeneralLayout;