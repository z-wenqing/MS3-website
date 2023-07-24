import React, {useState} from 'react';

import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

import { db } from "./config/firebase";
import {addDoc, collection} from "firebase/firestore"
import 'firebase/firestore';

const TextEditor = () => {
    const [content, setContent] = useState('');
  
    const handleChange = (value) => {
      setContent(value);
    };

    const handleSave = async () => {
      try {
        const threadsCollectionRef = collection(db, 'threads');
        const threadsData = await addDoc(threadsCollectionRef, {post: content});

        console.log('Content saved to Firestore with ID: ', threadsData.id);
        window.location.reload();
      } catch(error) {
        console.error('Error saving content to Firestore:', error);
      }
    };
  
    return (
      <div>
        <h1>My Quill Editor App</h1>
        <ReactQuill
          value={content}
          onChange={handleChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
          }}
          formats={[
            'header',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'list',
            'bullet',
            'link',
            'image',
          ]}
        />
        <button onClick={handleSave}>Save content</button>
      </div>
    );
  };
  
  export default TextEditor;