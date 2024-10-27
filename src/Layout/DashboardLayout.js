import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { getRole } from '../api/user'
import Sidebar from '../Components/Dashboard/Sidebar'
import { AuthContext } from '../contexts/AuthProvider'

const DashboardLayout = () => {
  const { user } = useContext(AuthContext)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    getRole(user?.email).then(data => {
      setRole(data)
      setLoading(false)
    })
  }, [user])
  return (
    <div>
      {loading ? (
        ""
      ) : (
        <>
          <div className='flex flex-row '>
          <div className='lg:w-[300px] md:w-[300px] sm:w-[1px] sticky top-0'>
          <Sidebar role={role} />
          </div>
          <div className='w-full '>
          <Outlet />
          </div>
          </div> 
        
        </>
      )}
    </div>
  );
}

export default DashboardLayout
