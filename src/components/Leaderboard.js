import React, { useState, useEffect } from "react";

import { query, orderBy, limit } from "firebase/firestore";  
import { db } from "../config/firebase";
import {getDocs, collection} from "firebase/firestore"

export default function Leaderboard() {

    const [usersList, setUsersList] = useState([]);
  
    const UserCollectionRef = collection(db, "teleusers");
  
    useEffect(() => {
      const getPointList = async () => {
        //read the data
        //set the user lis
        try {
          const data = await getDocs(UserCollectionRef);
          const filterdData = data.docs.map((doc) => ({...doc.data(), id: doc.id, }))
          
          filterdData.sort((a, b) => b.point - a.point);

          // Limit the user list to the top 5 users
          const topUsers = filterdData.slice(0, 5);

          setUsersList(topUsers);
          
        } catch (err) {
          console.error(err);
        }
      };
      getPointList();
    }, []);

    return (
        <>
            <h1>Leaderboard</h1>
      <ul>
        {usersList.map((user) => (
          <li key={user.id}>
           {user.username} - Points: {user.point}
          </li>
        ))}
      </ul>
        </>
    );
}