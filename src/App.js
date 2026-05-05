import AddUser from './AddUser';
import UserList from './UserList';

function App() {
  return (
    <div className="App" style={{ textAlign: "center" }}>
      <UserList />
      <br/>
      <AddUser />
    </div>
  );
}

export default App;
