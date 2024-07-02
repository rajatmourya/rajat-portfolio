import React from 'react'

function Loader() {
  return (
    <div className='h-screen flex bg-primary items-center justify-center fixed inset-0 z-[100]'>
        <div className="flex gap-5 text-6xl font-semibold sm:text-4xl">
            <h1 className="text-secondary r">R</h1>
            <h1 className="text-white j">J</h1>
            <h1 className="text-tertiary t">T</h1>
        </div>
    </div>
  )
}

export default Loader