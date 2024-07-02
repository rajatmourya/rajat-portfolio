import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    portfolioData: null,
    reloadData: false,
  },
  reducers: {
    ShowLoading: (State, action) => {
      State.loading = true;
    },
    HideLoading: (State, action) => {
      State.loading = false;
    },
    SetPortfolioData: (State, action) => {
      State.portfolioData = action.payload;
    },
    ReloadData: (state, action) => {
      state.reloadData = action.payload;
    }
  },
});

export default rootSlice.reducer;

export const { ShowLoading, HideLoading, SetPortfolioData, ReloadData } =
  rootSlice.actions;
