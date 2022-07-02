import { Link } from 'react-router-dom'
export default function App() {
  return (
    <>
      <section className="dark:bg-gray-900 dark:text-gray-100">
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-4xl font-bold leading-none sm:text-5xl">ITLang4U
          </h1>
          <p className="px-8 mt-8 mb-12 text-lg">ITLang4U là trang web sử dụng ReactJs và Firebase. Trang chia thành 2 thành phần chính là C# và Pascal.</p>
          <div className="flex flex-wrap justify-center">
            <Link to="/about/csharp" className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900">C#</Link>
            <Link to="/about/pascal" className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-emerald-800 dark:text-white-900">Pascal</Link>
          </div>
        </div>
      </section>
    </>
  );
}