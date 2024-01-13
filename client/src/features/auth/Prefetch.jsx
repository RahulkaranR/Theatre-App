import { store } from "../../app/store";
import { moviesApiSlice } from "../movies/moviesApiSlice"
import { showsApiSlice }  from "../shows/showsApiSlice"
import { usersApiSlice } from "../users/usersApiSlice"

import { useEffect } from "react";
import { Outlet } from "react-router-dom"


const Prefetch = () => {

    useEffect(() => {
        console.log("Subscribing");
        const movies = store.dispatch(moviesApiSlice.endpoints.getMovies.initiate())
        const shows = store.dispatch(showsApiSlice.endpoints.getShows.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        return () => {
            console.log("unSubscribing");
            movies.unsubscribe()
            shows.unsubscribe()
            users.unsubscribe()
        }
    }, [])


  return <Outlet />
}

export default Prefetch



