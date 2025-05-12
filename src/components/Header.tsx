import NavBar from "./navbar/NavBar";

export default function Header() {
  return (
    <header>
      <div className="bg-black">
        <NavBar/>
      </div>
      <div className="flex justify-center items-center size-full h-80 lg:h-100 ">
        <h1 className="p-5 mb-4 font-extrabold text-gray-900 dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Reddit Client 
          </span> 
          Clone
        </h1>
      </div>
    </header>
  )
}
