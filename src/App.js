import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ThemeProvider from "react-bootstrap/ThemeProvider"
import Login from "./components/Auth/Login/Login"
import Register from "./components/Auth/Register/Register"
import Dashboard from "./components/Dashboard/Dashboard"
import Reset from "./components/Auth/Reset/Reset";

function App() {

  return (
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs">
        <div className="my-weather">
          <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path='/dashboard' element={<Dashboard />} />
              <Route exact path='/reset-password' element={<Reset />} />
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
  );
}

export default App;
