import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg, setErrormsg] = useState('');
  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/admin');
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrormsg(errorCode);
      });
  }
  return (
    <>
      <div className="container mx-auto flex flex-col items-center px-4 py-16 md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign in</h1>
            <p className="text-sm dark:text-gray-400">Sign in to access your account</p>
          </div>
          <form action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm">Email</label>
                <input onChange={
                  (e) => {
                    setErrormsg('');
                    setEmail(e.target.value.replace(/\s/g, ''));
                  }
                } type="email" name="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm">Mật khẩu</label>
                </div>
                <input onChange={
                  (e) => {
                    setErrormsg('');
                    setPassword(e.target.value)
                  }
                } type="password" name="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <button onClick={
                  () => {
                    handleLogin();
                  }
                } type="button" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">Sign in</button>
              </div>
              <p className="text-sm text-orange-600">{ errormsg }</p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}