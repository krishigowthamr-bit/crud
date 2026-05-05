import { useState,useEffect } from "react";
import axios from "axios";
import { Modal,Button } from "react-bootstrap";

function UserList() {

  const [users, setUsers] = useState([]);
  const [updateName, setUpdateName] = useState();
  const [updateEmail, setUpdateEmail] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async() => {
      try {
        const response = await axios.get("https://node-1-4ddx.onrender.com/user/getuser/");
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error", error);
      }
  }

  const deleteData = async (id) => {
    try {
        const response = await axios.delete(`https://node-1-4ddx.onrender.com/user/deleteuser/${id}`);
        console.log("Create User", response);
        fetchData();
    } catch (error) {
        console.log("Error", error);
    }
  }

  const updateData = async (id) => {
    try {
        const response = await axios.put(`https://node-1-4ddx.onrender.com/user/updateuser/${selectedId}`, {name: updateName, email: updateEmail});
        console.log("Update User", response);
        fetchData();
        handleClose();
    } catch (error) {
        console.log("Error", error);
    }
  }

  const handleShow = (user) => {
      setSelectedId(user._id);
      setUpdateName(user.name); 
      setUpdateEmail(user.email);
      setShowModal(true);
  }

  const handleClose = () => {
      setShowModal(false);
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div className="App">
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{updateName}'s Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Name &nbsp;</label>
          <input type='text' placeholder='Enter Your Name' value={updateName} onChange={(e) => setUpdateName(e.target.value)}></input>
          
          <br/>
          <label>Email &nbsp;</label>
          <input type='text' placeholder='Enter Your Email' value={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)}></input>

        </Modal.Body>
        <Button onClick={updateData}>Update</Button>
      </Modal>
      
      <h3>Users List</h3>
      {users && users.map((user) => (
        <div key={user._id}> 
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => handleShow(user)}>Update</button>
            &nbsp;<button onClick={() => deleteData(user._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default UserList;