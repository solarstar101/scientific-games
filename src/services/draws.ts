import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const drawApiRecent = createApi({
  reducerPath: "drawApiRecent",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://puertorico.secondchancebonuszone.com/kino/past_drawings.php",
  }),
  endpoints: (builder) => ({
    singleRecentDraw: builder.query<any, string>({
      query: () => `draws`,
    }),
    pastDrawsStartingPoint: builder.query({
      query: (arg) => {
        const { drawid, number, sort } = arg;
        console.log("arg: ", arg);
        return {
          url: ``,
          params: { drawid, number, sort },
        };
      },
    }),
  }),
});

export const drawApiDrawID = createApi({
  reducerPath: "drawApiById",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://puertorico.secondchancebonuszone.com/kino/past_drawings.php",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    pastDrawsStartingPoint: builder.mutation({
      query: (arg) => {
        const { drawid, number, sort } = arg;
        console.log("arg: ", arg);
        return {
          url: "posts/",
          params: { drawid, number, sort },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSingleRecentDrawQuery, usePastDrawsStartingPointQuery }: any =
  drawApiRecent;
export const { useDrawApiByIdQuery }: any = drawApiDrawID;
