import { NavLink } from "react-router-dom";
import Luxury from "./images/Luxury.png";

function Nav() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={Luxury} height="50px" alt="Lux" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <div className="col-1">
              <li className="nav-item">
                <NavLink className="nav-link" to="/salespeople/create">
                  Add Employee
                </NavLink>
              </li>
            </div>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salespeople">
                Employees
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers/create">
                Add Customer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers">
                Customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales">
                Sales
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/history">
                Sales History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/create">
                Add Sale
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers">
                Manufacturers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers/create">
                Add Manufacturer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/models">
                Inventory
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technicians/new">
                Add Technicians
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technicians">
                Technicians
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments/new">
                Schedule Service Appointment
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments">
                Service Appointments
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments-history">
                Service History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/vehicle-model/new">
                Add Vehicle Model
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobiles">
                Inventory
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobiles/new">
                Add Vehicle
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
