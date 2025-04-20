import NavBar from "./navbar/NavBar";


export default function Header() {
  return (
        <header>
          <div className="bg-black">
            <NavBar/>
          </div>
          <div className="flex justify-center items-center size-full h-80 ">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-7xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Reddit Client 
              </span> 
              Clone
            </h1>
          </div>
        </header>
  )
}
