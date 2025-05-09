'use client'
import { MdErrorOutline } from "react-icons/md";
import { useSearchParams } from 'next/navigation';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit/react';
import { useEffect, useRef } from "react";

export default function ErrorPage({ error, reset }: {error: Error & { cause: FetchBaseQueryError | SerializedError | undefined }, reset: () => void}) {
  const searchParams = useSearchParams();
  const currentSearchTerm = searchParams.get('term');
  const hasMounted = useRef<boolean>(false);
  const prevSearchTerm = useRef<string | null>(null);


  useEffect(() => {
    if(!hasMounted.current){
      hasMounted.current = true;
      prevSearchTerm.current = currentSearchTerm;    
    }
    if(prevSearchTerm.current !== currentSearchTerm && hasMounted.current){
      prevSearchTerm.current = currentSearchTerm;
      reset() 
    }
  },[currentSearchTerm])
  return (
    <>
      <div className='pr-9 pl-9'>
        <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
          <div className=' w-full'>
            <div className='flex items-center justify-center'>
              <MdErrorOutline className='text-2xl mr-1'/>
              <h1 className="text-1xl xs:text-2xl sm:text-3xl md:text-4xl text-center font-bold">Error: {error.cause && 'status' in error.cause ? error.cause.status : null}</h1>   
            </div>
            <p className='pl-2 m-1 text-rose-600 text-sm xs:text-lg text-center'>{error.cause && 'message' in error.cause ? error.cause.message : error.message}</p>
          </div>
        </div>
      </div>
      <button
        className="fixed left-2.5 bottom-26 md:bottom-20 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 
          hover:bg-gradient-to-br hover:ring-4 focus:outline-none focus:ring-red-300 dark:hover:ring-red-800 
          font-medium rounded-lg text-sm px-8 py-4 text-center" 
        onClick={reset}
      >Reload</button>
      <div className='h-15 w-full'></div>
    </>
  )
}
