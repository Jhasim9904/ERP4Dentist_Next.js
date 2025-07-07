import Login from '@/components/Login/Login'
import React from 'react'
import Leftside from '@/components/Signup/Leftside'

const login = () => {
  return (
    <div>
      <div className="d-flex">
        <div className="">
          <Leftside />
        </div>
        <div className="">
          <Login />
        </div>
      </div>
    </div>
  )
}

export default login;
