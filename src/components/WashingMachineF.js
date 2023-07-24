import logo from "./laundry-icon-1.jpg";
import { Button } from "@nextui-org/react";


import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {getDocs, collection} from "firebase/firestore"

var availState = true;
var buttonState = new Array(4);
for (var i = 0; i < 4; i++) {
  buttonState[i] = "Unavailable";
}
var ID = 0;

export default function WashersF() {

  const [washerList, setWasherList] = useState([]);

  const washerCollectionRef = collection(db, "washersF");

  useEffect(() => {
    const getWasherList = async () => {
      //read the data
      //set the user lis
      try {
        const data = await getDocs(washerCollectionRef);
        const filterdData = data.docs.map((doc) => ({...doc.data(), id: doc.id, }))
        
        setWasherList(filterdData);
        console.log("ID is", filterdData[0].washerID);
        for (var i = 0; i < 4; i++) {
          if (filterdData[i].avail == true) {
            buttonState[i] = "Available";
          } else {
            buttonState[i] = "Unavailable";
          }
        } 
        
      } catch (err) {
        console.error(err);
      }
    };
    getWasherList();
  }, []);

  return (
    <>
      <table class="center">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={logo} />
            </td>
            <td>
              <img src={logo} />
            </td>
            <td>
              <img src={logo} />
            </td>
            <td>
              <img src={logo} />
            </td>
          </tr>

          <tr>
            <td>Washing Machine 1</td>
            <td>Washing Machine 2</td>
            <td>Washing Machine 3</td>
            <td>Washing Machine 4</td>
          </tr>

          <tr>
            <td>
              { buttonState[0] == "Available" ? (
                <Button size="sm">{buttonState[0]}</Button>
              ) : (
                <Button disabled size="sm">
                {buttonState[0]}
              </Button>
              )}   
            </td>
            
            <td>
              { buttonState[1] == "Available" ? (
                <Button size="sm">{buttonState[1]}</Button>
              ) : (
                <Button disabled size="sm">
                {buttonState[1]}
              </Button>
              )}   
            </td>
            
            <td>
              { buttonState[2] == "Available" ? (
                <Button size="sm">{buttonState[2]}</Button>
              ) : (
                <Button disabled size="sm">
                {buttonState[2]}
              </Button>
              )}   

            </td>
            
            <td>
              { buttonState[3] == "Available" ? (
                <Button size="sm">{buttonState[3]}</Button>
              ) : (
                <Button disabled size="sm">
                {buttonState[3]}
              </Button>
              )}   
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
