import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";

import {getDocs, collection} from "firebase/firestore"


const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const threadsCollectionRef = collection(db, "threads");

  useEffect(() => {
    const getThreadList = async () => {
      //read the data
      //set the user lis
      try {
        const data = await getDocs(threadsCollectionRef);
        const filterdData = data.docs.map((doc) => ({...doc.data(), id: doc.id, }))
        
        setThreads(filterdData);
        
      } catch (err) {
        console.error(err);
      }
    };
    getThreadList();
  }, []);

  return (
    <div>
      <h1>Forum Threads</h1>
      <ul>
        {threads.map((thread, index) => (
        <>
          <li key={index} dangerouslySetInnerHTML={{ __html: thread.post }} />

        </>
          
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
