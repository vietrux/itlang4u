import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs } from "firebase/firestore";
import { Table } from 'flowbite-react';
export default function Admin() {
  const navigate = useNavigate();
  const [blogsData, setBlogsData] = useState([{}]);
  async function GetData() {
    var blogs = [];
    const querySnapshot = await getDocs(collection(db, "blogs"));
    querySnapshot.forEach((doc) => {
      var blog = {
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        category: doc.data().category,
        created_at: doc.data().created_at
      }
      blogs.push(blog);
    });
    setBlogsData(blogs);
  }
  useEffect(() => {
    GetData();
  }
    , []);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('OK');
      } else {
        navigate('/login');
      }
    });
  }
    , []);
  function logout() {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
    });
  }

  return (
    <>
      <div className='my-2'>
        <span className='text-4xl font-bold leading-none sm:text-5xl'>Admin</span>
        <button onClick={
          () => {
            logout();
          }
        } className="px-8 py-3 m-2 text-sm font-semibold rounded bg-violet-400 dark:bg-violet-400 dark:text-gray-900">Logout</button>
      </div>
      <button onClick={
          () => {
            navigate('/admin/create');
          }
        } className="px-8 py-3 m-2 text-sm font-semibold rounded bg-violet-400 dark:bg-violet-400 dark:text-gray-900">Create</button>
      <div className='overflow-auto my-10' style={{ "maxHeight": "80vh" }}>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>
              Title
            </Table.HeadCell>
            <Table.HeadCell>
              ID
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">
                Edit
              </span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {blogsData.map((blog, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    {blog.title}
                  </Table.Cell>
                  <Table.Cell>
                    {blog.id}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/admin/update/${blog.id}`} className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                        Edit
                    </Link>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </div>
    </>
  )
}