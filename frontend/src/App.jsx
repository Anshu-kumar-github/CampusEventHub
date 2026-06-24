// import { Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Events from "./pages/Events";
// import EventDetails from "./pages/EventDetails";
// import CreateEvent from "./pages/CreateEvent";
// import MyRegistrations from "./pages/MyRegistrations";
// import Participants from "./pages/Participants";
// import ProtectedRoute from "./routes/ProtectedRoute";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//       <Route
//   path="/dashboard"
//   element={
//     <ProtectedRoute>
//       <Dashboard />
//     </ProtectedRoute>
//   }
// />
//       {/* <Route path="/events" element={<Events />} /> */}
//       <Route
//   path="/events"
//   element={
//     <ProtectedRoute>
//       <Events />
//     </ProtectedRoute>
//   }
// />
//       <Route
//   path="/events/:id"
//   element={
//     <ProtectedRoute>
//       <EventDetails />
//     </ProtectedRoute>
//   }
// />
//       {/* <Route path="/create-event" element={<CreateEvent />} /> */}
//       <Route
//   path="/create-event"
//   element={
//     <ProtectedRoute>
//       <CreateEvent />
//     </ProtectedRoute>
//   }
// />
//       {/* <Route
//         path="/my-registrations"
//         element={<MyRegistrations />}
//       /> */}
//       <Route
//   path="/my-registrations"
//   element={
//     <ProtectedRoute>
//       <MyRegistrations />
//     </ProtectedRoute>
//   }
// />
//       {/* <Route
//         path="/participants/:eventId"
//         element={<Participants />}
//       />
//     </Routes> */}
//     <Route
//   path="/participants/:eventId"
//   element={
//     <ProtectedRoute>
//       <Participants />
//     </ProtectedRoute>
//   }
// />
//   );
// }

// export default App;


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
            <CreateEvent />
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

      <Route
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
      />

    </Routes>
  );
}

export default App;