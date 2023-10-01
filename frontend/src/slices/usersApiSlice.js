import { USERS_URL } from "../constats";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data
      })
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL
      }),
      providesTags: ['Users'],
      keepUnusedDataFor: 5
    }),
    deleteUsers: builder.mutation({
      query: userId => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE'
      })
    }),
    getUsersDetails: builder.query({
      query: userId => ({
        url: `${USERS_URL}/${userId}`
      }),
      keepUnusedDataFor: 5
    }),
    updateUser: builder.mutation({
      query: (updatedUser) => ({
        url: `${USERS_URL}/${updatedUser.userId}`,
        method: 'PUT',
        body: updatedUser
      }),
      invalidatesTags: ['Users']
    })
  })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDeleteUsersMutation, useGetUsersDetailsQuery, useUpdateUserMutation } = usersApiSlice;