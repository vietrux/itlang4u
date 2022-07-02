import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Flowbite, DarkThemeToggle } from 'flowbite-react';
export default function NavBar() {
  const [blogscsharp, setBlogsCsharp] = useState([]);
  const [blogspascal, setBlogsPascal] = useState([]);
  const [blogsfaf, setBlogsFaf] = useState([]);
  async function GetData() {
    const q = query(collection(db, "blogs"), where("category", "==", "csharp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const blogs = [];
      querySnapshot.forEach((doc) => {
        blogs.push({
          id: doc.id,
          title: doc.data().title,
        });
      });
      setBlogsCsharp(blogs);
      // console.log(blogs)
    });
  }
  async function GetDataa() {
    const q = query(collection(db, "blogs"), where("category", "==", "pascal"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const blogs = [];
      querySnapshot.forEach((doc) => {
        blogs.push({
          id: doc.id,
          title: doc.data().title,
        });
      });
      setBlogsPascal(blogs);
      // console.log(blogs)
    });
  }
  async function GetDataaa() {
    const q = query(collection(db, "blogs"), where("category", "==", "faf"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const blogs = [];
      querySnapshot.forEach((doc) => {
        blogs.push({
          id: doc.id,
          title: doc.data().title,
        });
      });
      setBlogsFaf(blogs);
      // console.log(blogs)
    });
  }
  useEffect(() => {
    GetData();
    GetDataa();
    GetDataaa();
  }
    , []);
  return (
    <>
      <nav className="px-2 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link to="/" className="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-10" alt="ITLang4U Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">ITLang4U</span>
          </Link>
          <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center justify-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500" aria-controls="mobile-menu-2" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</Link>
              </li>
              {/* dropdown */}
              <li>
                <button data-dropdown-toggle="dropdowncsharp" className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">C#<svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
                <div id="dropdowncsharp" className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600 overflow-auto max-h-64">
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                    <div className="py-1">
                      <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">About</Link>
                    </div>
                    {blogscsharp.map((blog) => (
                      <li key={blog.id}>
                        <Link to={`/article/${blog.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">{blog.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              {/* dropdown */}
              <li>
                <button data-dropdown-toggle="dropdownpascal" className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Pascal<svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
                <div id="dropdownpascal" className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600 overflow-auto max-h-64">
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                    <div className="py-1">
                      <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">About</Link>
                    </div>
                    {blogspascal.map((blog) => (
                      <li key={blog.id}>
                        <Link to={`/article/${blog.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">{blog.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              {/* dropdown */}
              <li>
                <button data-dropdown-toggle="dropdownfaf" className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Family and Friend 3<svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
                <div id="dropdownfaf" className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600 overflow-auto max-h-64">
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                    <div className="py-1">
                      <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">About</Link>
                    </div>
                    {blogsfaf.map((blog) => (
                      <li key={blog.id}>
                        <Link to={`/article/${blog.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">{blog.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <Link to="/" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">About</Link>
              </li>
              <li>
                <Link to="/" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Contact</Link>
              </li>
            </ul>
          </div>
          <Flowbite>
            <DarkThemeToggle />
          </Flowbite>
        </div>
      </nav>
    </>
  )
}