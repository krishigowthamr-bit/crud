import { useState } from "react";
import axios from "axios";

function AddUser() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addUser = async () => {
        try {
            const response = await axios.post("https://node-1-4ddx.onrender.com/user/createUser/", {name, email});
            console.log("Create User", response)
            alert("User Added");
            setName("");
            setEmail("");
        } catch (error) {
            console.log("Error User", error);
        }
    }

  return (
    <div className="App">
        <h3>Add User</h3>
        <label>Name &nbsp;</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        
        <label>&nbsp; Email &nbsp;</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <br/><br/>
        <button onClick={addUser}>Add</button>
    </div>
  );
}

export default AddUser;