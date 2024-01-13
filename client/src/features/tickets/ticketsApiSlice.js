import { apiSlice } from "../../app/api/apiSlice";

export const showsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getallticket: builder.query({
        query:() => '/ticket',
        }),
        bookticket: builder.mutation({
            query: initialShowData => ({
                url: '/ticket',
                method: "POST",
                body: {
                    ...initialShowData
                }
            })
        }),
        getsingleticket : builder.query({
            query: ({ id }) => ({
                url: `/ticket/${id}`,
            })
        }),
        deleteticket : builder.mutation({
            query: ({id}) => ({
                url: `/ticket/${id}`,
                method: "DELETE"
            })
        })
    })
})


export const {
    useBookticketMutation,
    useDeleteticketMutation,
    useGetallticketQuery,
    useGetsingleticketQuery
    
} = showsApiSlice









