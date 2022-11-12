import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URI,
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ body }) => ({
        url: "/graphql",
        method: "POST",
        body,
      }),
    }),
    signInUser: builder.mutation({
      query: ({ body }) => ({
        url: "/graphql",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useSignInUserMutation } = userApi;

export default userApi;
