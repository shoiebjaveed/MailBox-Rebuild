import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./components/Home/Home";
import Inbox from "./components/Inbox/Inbox";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import MailPage from "./components/MailPage/MailPage";
import Sent from "./components/Sent/Sent";
import ViewSent from "./components/Sent/ViewSent";


function App() {
  const isToken = localStorage.getItem("token");
  return (
    <BrowserRouter>
      {isToken !== null &&
        <>
          <Header />
          <Sidebar />
        </>
      }
      <Routes>
        {isToken === null &&
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Login />} />
          </>
        }
        {isToken !== null &&
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/inbox/:id" element={<MailPage />} />
            <Route path="/sent" element={<Sent />} />
            <Route path="/sent/:id" element={<ViewSent />} />
            <Route path="*" element={<Inbox />} />
          </>
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
