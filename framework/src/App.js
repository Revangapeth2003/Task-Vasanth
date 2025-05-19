
import './App.css';
import Home from './component/Home';
import Profile from './component/Profile';
import Section from './component/Section';
import Upload from './component/Upload';
import Preview from './component/Preview';
import Edit from './component/Edit';
import {BrowserRouter,Routes,Route} from "react-router-dom"


function App()  {
  return (
    <div>
      <BrowserRouter>
      <div>
        <Home />
        <div className="layout-container d-flex">
          <Section /> 
          <div className="main-content flex-grow-1 p-4">
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/employee/:id" element={<Preview />} />
              <Route path="/employee/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
