import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    layout: 'foundation'
  },

  reducers: {
    setLayout: (state, action) => {
      state.layout = action.payload
    }
  }

})

export const { setLayout } = appSlice.actions

export const selectLayout = state => state.app.layout

export default appSlice.reducer