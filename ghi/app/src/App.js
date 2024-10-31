import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import TechnicianForm from "./TechnicianForm";
import TechnicianList from "./TechnicianList";
import AppointmentCreateForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import ServiceHistoryList from "./ServiceHistoryList";
import VehicleModelCreateForm from "./CreateVehicleModel";
import AutomobileList from "./AutomobilesList";
import AutomobileCreateForm from "./CreateAutomobile";
import CreateSalesperson from './AddSalesperson';
import SalesPeopleList from './SalespeopleList';
import CreateCustomer from './AddCustomer';
import CustomerList from './CustomersList';
import SalesList from './SalesList';
import SalespersonHistoryList from './SalesHistoryList';
import SaleForm from './AddSales';
import ManufacturersList from './ManufacturersList';
import CreateManufacturer from './AddManufacturers';
import ModelsList from './ModelsList';

function App(props) {
  if (props.technicians === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians">
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="technicians">
            <Route
              index
              element={<TechnicianList technician={props.technicians} />}
            />
          </Route>
          <Route path="appointments">
            <Route path="new" element={<AppointmentCreateForm />} />
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentList />} />
          </Route>
          <Route path="appointments-history">
            <Route index element={<ServiceHistoryList />} />
          </Route>
          <Route path="vehicle-model">
            <Route path="new" element={<VehicleModelCreateForm />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
          </Route>
          <Route path="automobiles">
            <Route path="new" element={<AutomobileCreateForm />} />
          </Route>
          <Route path="salespeople/create" element={<CreateSalesperson />} />
          <Route path="salespeople" element={<SalesPeopleList />} />
          <Route path="customers/create" element={<CreateCustomer />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="sales" element={<SalesList />} />
          <Route path="sales/history" element={<SalespersonHistoryList />} />
          <Route path="sales/create" element={<SaleForm />} />
          <Route path="manufacturers" element={<ManufacturersList />} />
          <Route path="manufacturers/create" element={<CreateManufacturer />} />
          <Route path="models" element={<ModelsList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
