import React, { useState, useEffect } from "react";

import WelcomeBanner from "../components/WelcomeBanner";
import WashersE from "./WashingMachineE";
import WashersF from "./WashingMachineF";
import DryerE from "./DryerE";
import DryerF from "./DryerF";

import Select from "react-select";
import ThreadList from "./ThreadList";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

import { db } from "../config/firebase";
import {getDoc, collection, doc} from "firebase/firestore"

import "../styles.css";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {  
  const actions = [
    { label: "RVRC Block E", value: 1 },
    { label: "RVRC Block F", value: 2 },
  ];

  const [selectedOption, setSelectedOption] = useState(1);
  //const [selectedOption, setSelectedOption] = useState(actions.find((option) => option.value === 1));

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log("selected option is: ", selectedOption);
  };

  const navigate = useNavigate();

  const handleProfileEdit = () => {
    navigate("/profile/edit");
  }
  
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Error signing out:", error);
      });
  }

  const [userList, setUserList] = useState([]);
  const [location, setLocation] = useState(1);
  
  
  useEffect(() => {
    const getUsersList = async () => {
      
      try {
        const user = auth.currentUser;
        if (user) { 
          const uid = user.uid;

          const usersCollectionRef = doc(db, "users", uid);

          const data = await getDoc(usersCollectionRef);
       
          const userData = data.data();
          console.log("user location is: ", userData.location);
          setSelectedOption(actions.find((option) => option.value === parseInt(userData.location)));

          //setSelectedOption(actions.find((option) => option.value === parseInt(userData.location)));
          
          /* if (selectedOptionFromLocalStorage) {
            setSelectedOption(JSON.parse(selectedOptionFromLocalStorage));
          } else {
            setSelectedOption(actions.find((option) => option.value === parseInt(userData.location)));
          }  */
        }      
        
      } catch (err) {
        console.error(err);
      }
    };
    getUsersList();
  }, []);

  /*useEffect(() => {
    // Store the selected option in local storage whenever it changes
    if (selectedOption) {
      localStorage.setItem("selectedOption", JSON.stringify(selectedOption));
      console.log("selected option now is: ", selectedOption);
    }
  }, [selectedOption]); */

    return (
      <>
        <button className = "ButtonUpdate" variant="contained" color="primary" fullWidth onClick={handleProfileEdit}>
          Edit Profile
        </button>

        <button className = "Button-signout" variant="contained" color="primary" fullWidth onClick={handleSignout}>
          Sign Out
        </button>


        <div className="App">
          <WelcomeBanner />
          
        </div>
  
        <div className="container">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <Select 
                value={selectedOption}
                onChange={handleOptionChange}
                options={actions} />
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
        { selectedOption && selectedOption.value == 1 ? (
          <>
          <DryerE /> 
          <WashersE />
          </> ) : (
          <>
          <DryerF /> <WashersF />
          </>
          ) 
        }  
      </>
    );
  }
  