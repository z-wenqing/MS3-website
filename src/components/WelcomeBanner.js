import { useState } from "react";

export default function WelcomeBanner() {
  /*const [name, setName] = useState("Alice");

  const handleNameChangeClick = () => {
    const newName = prompt("What's your name?");
    if (newName.length === 0) {
      setName("<unknown>");
    } else {
      setName(newName);
    }
  }; */
  return (
    <header>
      <h1>NUS Laundry Tracker</h1>
      <p>It is so nice to have you back on the app :)</p>
    </header>
  );
}
