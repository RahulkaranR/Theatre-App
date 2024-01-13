import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Userslists from "./features/users/Userslists";
import MoviesLists from "./features/movies/MoviesLists";
import Welcome from "./features/auth/Welcome";
import TheaterSeats from "./features/shows/TheaterSeats";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import NewMovieForm from "./features/movies/NewMovieForm";
import EditeMovie from "./features/movies/EditeMovie";
import ShowsLists from "./features/shows/ShowsLists";
import NewShowForm from "./features/shows/NewShowForm";
import EditShow from "./features/shows/EditShow";
import Prefetch from "./features/auth/Prefetch";
import ShowtoBook from "./features/tickets/ShowtoBook"
import TicketBooking from "./features/tickets/TicketBooking"
import UsersTickets from "./features/tickets/UsersTickets";
import Profile from "./features/users/Profile";



function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<NewUserForm />}/>
        <Route element={<Prefetch />}>
            <Route path="dash">
              <Route index element={<Welcome />} />
              <Route path="booking">
                <Route index element={<ShowtoBook />} />
                <Route path="show" element={<TicketBooking />} />
                <Route path="tickets" element={<UsersTickets />} />
                <Route path="profile" element={<Profile />}/>
              </Route>
              <Route path="Admin">
                <Route path="user">
                  <Route index element={<Userslists />} />
                  <Route path=":id" element={<EditUser />}/>
                </Route>
                <Route path="movie">
                  <Route index element={<MoviesLists />} />
                  <Route path="new" element={<NewMovieForm />} />
                  <Route path=":id" element={<EditeMovie />} />
                  <Route path="seats" element={<TheaterSeats />} />
                </Route>
                <Route path="show" >
                  <Route index element={<ShowsLists />} />
                  <Route path="new" element={<NewShowForm />} />
                  <Route path=":id" element={<EditShow />} />
                </Route>
              </Route>
            </Route>{/* End of Dash */}
        </Route>
      </Route>
    </Routes>
  )
}

export default App
