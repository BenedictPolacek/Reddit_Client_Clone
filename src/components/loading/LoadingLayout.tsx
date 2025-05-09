'use client'
import React from 'react'
import Skeleton from './Skeleton'

export default function LoadingLayout() {
  return (
    <>
      <div className='hidden lg:flex w-full justify-center'>
        <Skeleton/>
        <Skeleton/>
      </div>
      <div className='lg:hidden flex justify-center'>
        <Skeleton/>
      </div>
    </>
  )
}

