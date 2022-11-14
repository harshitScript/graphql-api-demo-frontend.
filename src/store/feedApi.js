import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const feedApi = createApi({
  reducerPath: "feeds",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URI,
  }),
  tagTypes: ["posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ page, headers }) => ({
        url: `feed/posts/${page}`,
        headers,
      }),
      providesTags: ["posts"],
    }),

    createPost: builder.mutation({
      query: ({ body, headers }) => ({
        url: "graphql",
        method: "POST",
        body,
        headers,
      }),
      invalidatesTags: ["posts"],
    }),

    editPost: builder.mutation({
      query: ({ body, id }) => ({
        url: `feed/edit-post/${id}`,
        method: "PUT",
        body,
      }),
    }),

    getSinglePost: builder.query({
      query: ({ id }) => {
        return `/feed/post/${id}`;
      },
    }),

    deletePost: builder.mutation({
      query: ({ id, headers }) => ({
        url: `/feed/delete-post/${id}`,
        method: "DELETE",
        headers,
      }),
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useGetSinglePostQuery,
  useDeletePostMutation,
} = feedApi;

export default feedApi;
