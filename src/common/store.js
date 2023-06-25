import { configureStore } from '@reduxjs/toolkit';
import { pointsReducer } from '../LearnToEarn/data/slice';
import { STORE_NAMES } from './constants';

export default configureStore({
  reducer: {
    [STORE_NAMES.Points]: pointsReducer,
  },
});
