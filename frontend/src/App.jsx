import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import MyRegistrations from "./pages/MyRegistrations";
import Participants from "./pages/Participants";
import ProtectedRoute from "./routes/ProtectedRoute";
import Analytics from "./pages/Analytics";
import AdminRoute from "./routes/AdminRoute";
import EditEvent from "./pages/EditEvent";
import ManageEvents from "./pages/ManageEvents";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events/:id"
        element={
          <ProtectedRoute>
            <EventDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-event"
        element={
          <ProtectedRoute>
  <AdminRoute>
    <CreateEvent />
  </AdminRoute>
</ProtectedRoute>
        }
      />

      <Route
        path="/my-registrations"
        element={
          <ProtectedRoute>
            <MyRegistrations />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/participants/:eventId"
        element={
          <ProtectedRoute>
            <Participants />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics/:eventId"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      /> */}

      <Route
  path="/participants/:eventId"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <Participants />
      </AdminRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/analytics/:eventId"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <Analytics />
      </AdminRoute>
    </ProtectedRoute>
  }
/>

      <Route
  path="/edit-event/:id"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <EditEvent />
      </AdminRoute>
    </ProtectedRoute>
  }
/>

      <Route
        path="/manage-events"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <ManageEvents />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;