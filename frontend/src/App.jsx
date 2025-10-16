import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import CheckOrder from "./pages/CheckOrder";
import Dashboard from "./pages/Dashboard";
import OrdersAdmin from "./pages/OrdersAdmin";
import MenuAdmin from "./pages/MenuAdmin";
import Landing from "./pages/Landing";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/check-order" element={<CheckOrder />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/orders" element={<OrdersAdmin />} />
        <Route path="/admin/menu" element={<MenuAdmin />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
