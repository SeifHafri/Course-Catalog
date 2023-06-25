import { ensureConfig, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

ensureConfig(['LMS_BASE_URL'], 'grades API service');

export const getPoints = async () => {
  const client = getAuthenticatedHttpClient();
  const baseUrl = getConfig().LMS_BASE_URL;
  const response = await client.get(`${baseUrl}/api/grades/v1/courses/course-v1:edX+DemoX+Demo_Course/`);
  // This data is actually paginated. The results object contains
  // the first page. For simplicity's sake, we're going to ignore
  const userPointsSum = {};
  response.data.results.forEach((user) => {
    if (userPointsSum[user.username]) {
      userPointsSum[user.username] += user.percent;
    } else {
      userPointsSum[user.username] = user.percent;
    }
  });
  // pagination and just use the first page.
  return userPointsSum;
};

export default { getPoints };
