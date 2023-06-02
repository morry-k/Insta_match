import logo from './logo.svg';
import './App.css';
import UserComponent from './UserComponent';
import InstagramLoginButton from './InstagramLoginButton';



function App() {
  return (
    <div className="App">
      <h1>Insta match</h1>
      <UserComponent />
      <InstagramLoginButton />
    </div>
  );
}

export default App;
