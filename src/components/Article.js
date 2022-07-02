import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, getDoc } from "firebase/firestore";

export default function Article() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState();
  const { id } = useParams();
  console.log(id);
  //get url
  useEffect(() => {
    async function handleGetDoc() {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTitle(docSnap.data().title);
        setContent(docSnap.data().content);
        //convert string to html
        const html = docSnap.data().content;
        const div = document.createElement('div');
        div.innerHTML = html;
        //add html to content
        setContent(div.innerHTML);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    handleGetDoc();
  }
    , [id]);
  return (
    <>


      <section className="dark:bg-gray-900 dark:text-gray-100">
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-2xl font-bold leading-none sm:text-5xl">{title}
          </h1>
          <div className='pt-8'>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </section>
    </>
  )
}