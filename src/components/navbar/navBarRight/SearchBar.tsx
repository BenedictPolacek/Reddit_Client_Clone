'use client'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useFormStatus } from 'react-dom';

export default function SearchBar({formClassName, buttonClassName}: {formClassName: string, buttonClassName?: string}) {
  const [ term, setTerm ] = useState('');
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      router.push(`/search?term=${term}`);
      setTerm('');
    })
  }

  return (
    <form onSubmit={searchHandler} className={`${formClassName} sm:block max-w-110`} > 
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg 
                  className="w-4 h-4 text-gray-500 dark:text-gray-400" 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
            </div>
            <input 
              name="term"
              onFocus={(e) => e.target.select()} 
              id="default-search" 
              className="h-12 md:h-13 block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
                bg-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Search posts..." 
              required
              onChange={(e) => setTerm(e.target.value)}
              value={term}
            />
            <button 
              type="submit" 
              disabled={isPending}
              className={`${buttonClassName} text-white absolute end-2.5 bottom-1.5 md:bottom-2 bg-blue-600 hover:bg-blue-800 active:ring-4 
                focus:outline-none active:ring-blue-700 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:hover:bg-gray-700 
                dark:ring-gray-700 disabled:cursor-not-allowed disabled:bg-gray-700`}
            >{ isPending ? '...Searching' : 'Search'}</button>
        </div>
    </form>
  )
}
