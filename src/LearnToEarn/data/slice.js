/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { STORE_NAMES } from '../../common/constants';

export const initialPointsState = () => ({
  fetching: false,
  errors: [],
  courses: [],
  users: [],
  points: [],
});

export const basePointsReducers = {
  fetchPointsRequest(state) {
    state.fetching = true;
    state.errors = [];
    state.points = [];
  },
  fetchPointsSuccess(state, { payload }) {
    state.fetching = false;
    state.points = payload.points;
  },
  fetchPointsFailure(state, { payload }) {
    state.fetching = false;
    state.errors = payload.errors;
  },
};

const slice = createSlice({
  name: STORE_NAMES.LearnToEarn,
  initialState: initialPointsState(),
  reducers: basePointsReducers,
});

export const pointsReducer = slice.reducer;
export const pointsActions = slice.actions;
