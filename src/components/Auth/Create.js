import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection } from "firebase/firestore";
import { Label, Select, TextInput } from 'flowbite-react';
import JoditEditor from "jodit-react";

export default function Create() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('csharp');
  const editor = useRef(null);
  async function handleAddDoc() {
    const docRef = await addDoc(collection(db, "blogs"), {
      title,
      content,
      category,
      created_at: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
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
            handleAddDoc();

          }
        } className="px-8 py-3 m-2 text-sm font-semibold rounded bg-violet-400 dark:bg-violet-400 dark:text-gray-900">Create</button>
      </div>
    </>
  )
}