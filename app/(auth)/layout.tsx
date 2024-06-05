import React from 'react'

const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (

    <div className='flex justify-center items-center h-full bg-[#151d30]'> {children}</div>

  )
}

export default AuthLayout