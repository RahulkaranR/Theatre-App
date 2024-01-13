import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const showsAdapter = createEntityAdapter({});


const initialState = showsAdapter.getInitialState()


export const showsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getShows: builder.query({
        query:() => '/shows',
        validateStatus:(response, result) => {
            return response.status === 200 && !result.isError
        },
        transformResponse: responseData => {
            const loadedShows = responseData.map(shows => {
                shows.id = shows._id 
                return shows
            });
            return showsAdapter.setAll(initialState, loadedShows)
        },
        providesTags: (result, error, arg) => {
            if(result?.ids){
                return [
                    {type: "Shows", id: "LIST"},
                    ...result.ids.map(id => ({type: "Shows", id}))
                ]
            }else return [{type: "Shows", id: "LIST"}]
        }
        }),
        getShow: builder.query({
            query: ({id}) => ({
                url: `/shows/${id}`
            })
        }),
        addNewShow: builder.mutation({
            query: initialShowData => ({
                url: "/shows",
                method: "POST",
                body: {
                    ...initialShowData
                }
            }),
            invalidatesTags: [
                {type: "Shows", id: "LIST"}
            ]
        }),
        updateShow : builder.mutation({
            query: initialShowDate => ({
                url: `/shows/${initialShowDate.id}`,
                method: "PATCH",
                body: {...initialShowDate}
            }),
            invalidatesTags:(result, error, arg) => [
                {type: "Shows", id: arg.id}
            ]
        })
    })
})


export const {
    useGetShowsQuery,
    useAddNewShowMutation,
    useUpdateShowMutation,
    useGetShowQuery
} = showsApiSlice

export const selectShowsResult = showsApiSlice.endpoints.getShows.select()

const selectShowsData = createSelector(
    selectShowsResult,
    showsResult => showsResult.data
)
export const {
    selectAll: selectAllShows,
    selectById: selectShowsById,
    selectIds: selectShowsIds
} = showsAdapter.getSelectors(state => selectShowsData(state) ?? initialState)




