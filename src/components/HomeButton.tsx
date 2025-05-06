import { FaHouseChimney } from "react-icons/fa6";

export function HomeButton(){
  return (
    <a 
      href="#navbar"
      type="button" 
      className="fixed bottom-26 md:bottom-22 right-3 sm:right-5 rounded-full text-8xl w-16 h-16 flex justify-center items-center 
        px-3 py-2.5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
        focus:ring-blue-300 font-medium text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-black 
        dark:hover:bg-blue-500 dark:focus:ring-blue-800"
    >
      <FaHouseChimney className="w-11 h-13"/>
    </a>
  )
}