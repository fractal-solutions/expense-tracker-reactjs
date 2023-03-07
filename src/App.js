import logo from './logo.svg';
import './App.css';
import SideBar from './sidebar';
import TopNav from './topnav';
import ContentContainer from './content';




function App() {

  return (
    <div className="">
        <TopNav/>
        <SideBar/>
        <ContentContainer/>
        
    </div>
  );
}

export default App;
