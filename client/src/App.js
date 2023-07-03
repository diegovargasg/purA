import "./App.css"
import { Routes, Route, Link } from "react-router-dom"
import { Dealers } from "./modules/dealers/Dealers"
import { Home } from "./modules/home/Home"
import { Vehicles } from "./modules/vehicles/Vehicles"
import { Customers } from "./modules/customers/Customers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <>
      <header>
        <div className="navbar navbar-dark bg-dark shadow-sm">
          <div className="container">
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <FontAwesomeIcon icon={faGlobe} className="me-1" />
              <strong>Pura</strong>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="dealers" element={<Dealers />} />
          <Route path="customers" element={<Customers />} />
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </main>
    </>
  )
}

export default App
