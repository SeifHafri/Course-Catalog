import * as api from './api';
import { pointsActions as actions } from './slice';

export const fetchPoints = () => async (dispatch) => {
  try {
    dispatch(actions.fetchPointsRequest({}));
    const points = await api.getPoints();
    dispatch(actions.fetchPointsSuccess({ points }));
  } catch (err) {
    dispatch(actions.fetchPointsFailure({ errors: [String(err)] }));
  }
};

export default { fetchPoints };
