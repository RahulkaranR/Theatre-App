import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const moviesAdapter = createEntityAdapter({});


const initialState = moviesAdapter.getInitialState()


export const moviesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMovies: builder.query({
        query:() => '/movies',
        validateStatus:(response, result) => {
            return response.status === 200 && !result.isError
        },
        transformResponse: responseData => {
            const loadedMovies = responseData.map(movie => {
                movie.id = movie._id 
                return movie
            });
            return moviesAdapter.setAll(initialState, loadedMovies)
        },
        providesTags: (result, error, arg) => {
            if(result?.ids){
                return [
                    {type: "Movie", id: "LIST"},
                    ...result.ids.map(id => ({type: "Movie", id}))
                ]
            }else return [{type: "Movie", id: "LIST"}]
        }
        }),
        getMovie : builder.query({
            query: ({ id }) => ({
                url: `/movies/${id}`,
                method: "GET"
            })
        }),
        addNewMovie: builder.mutation({
            query: initialMovieData => ({
                url: "/movies",
                method: "POST",
                body: {
                    ...initialMovieData
                }
            }),
            invalidatesTags: [
                {type: "Movie", id: "LIST"}
            ]
        }),
        updateMovie: builder.mutation({
            query: initialMovieData => ({
                url: `/movies/${initialMovieData.id}`,
                method: "PATCH",
                body: {
                    ...initialMovieData
                }
            }),
            invalidatesTags:(result, error, arg) => [
                {type: "Movie", id: arg.id}
            ]
        }),
        deleteMovie: builder.mutation({
            query: ({ id }) => ({
                url: `/movies/${id}`,
                method: "DELETE",
                body: {id}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: "Movie", id: arg.id}
            ]
        })
        
    })
})


export const {
    useGetMoviesQuery,
    useAddNewMovieMutation,
    useUpdateMovieMutation,
    useDeleteMovieMutation,
    useGetMovieQuery
} = moviesApiSlice

export const selectMoviesResult = moviesApiSlice.endpoints.getMovies.select()

const selectMoviesData = createSelector(
    selectMoviesResult,
    moviesResult => moviesResult.data
)
export const {
    selectAll: selectAllMovies,
    selectById: selectMoviesById,
    selectIds: selectMovieIds
} = moviesAdapter.getSelectors(state => selectMoviesData(state) ?? initialState)




