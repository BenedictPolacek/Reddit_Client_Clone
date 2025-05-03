'use client'
import React from 'react'
import Skeleton from './Skeleton'
import { useWindowWidth } from '@/hooks/useWindowWidth'

export default function LoadingLayout() {
  const windowWidth = useWindowWidth()
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

