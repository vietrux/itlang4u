import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc,deleteDoc } from "firebase/firestore";
import { Label, Select, TextInput } from 'flowbite-react';
import JoditEditor from "jodit-react";

export default function Update() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('csharp');
  const editor = useRef(null);
  //get url
  const { id } = useParams();

  async function handleGetDoc() {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTitle(docSnap.data().title);
      setContent(docSnap.data().content);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  useEffect(() => {
    handleGetDoc();
  }, []);
  async function handleUpdateDoc() {
    await setDoc(doc(db, "blogs", id), {
      title,
      content,
      category,
      created_at: new Date()
    });
    navigate('/admin');
  }
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
  return (
    <>
      <div className='container mx-auto flex flex-col py-16 md:px-4 md:py-16'>
        <div id="select">
          <div className="mb-2 block">
            <Label>Category</Label>
          </div>
          <Select
            id="countries"
            required={true}
            // get value from child component
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option defaultValue="csharp">
              C#
            </option>
            <option value="pascal">
              Pascal
            </option>
            <option value="faf">
              Family and Friend 3
            </option>
          </Select>
        </div>
        <TextInput
          id="large"
          type="text"
          sizing="lg"
          value={title}
          placeholder='Title'
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <JoditEditor
          ref={editor}
          value={content}
          onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={newContent => {
            setContent(newContent);
          }}
        />
        <button onClick={
          () => {
            handleUpdateDoc();
          }
        } className="px-8 py-3 m-2 text-sm font-semibold rounded bg-violet-400 dark:text-gray-900">Update</button>
        <button onClick={
          async () => {
            await deleteDoc(doc(db, "blogs", id));
            navigate('/admin');
          }
        } className="px-8 py-3 m-2 text-sm font-semibold rounded bg-orange-600 dark:text-gray-900">Delete</button>
      </div>
    </>
  )
}