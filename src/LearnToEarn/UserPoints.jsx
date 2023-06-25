/* eslint-disable  */

import {
    Alert, Card, Col, Container, Row,
} from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from '@edx/paragon/dist/Button';
import { fetchPoints } from './data/thunks';
import selectCourses from './data/selectors';
import messages from './messages';

// const buildLmsUrl = (absoluteUrl) => `${getConfig().LMS_BASE_URL}${absoluteUrl}`;
// const buildCourseURL = (courseKey) => buildLmsUrl(`/courses/${courseKey}/about`);

export const LearnToEarnPageBase = ({ intl }) => {
    // These 'use' functions are React hooks. Hooks let you hook into
    // parts of react like the state management system. You can read
    // more about them here: https://reactjs.org/docs/hooks-overview.html
    const dispatch = useDispatch();
    const [userPoints, setUserPoints] = useState([]);
    //const { courses, errors, fetching } = useSelector(selectCourses);
    // By providing no dependencies in the second
    // argument, we signal that this hook should be run when the
    // component is mounted.
    useEffect(() => {
        dispatch(fetchPoints());
    }, []);
    return (
        <div>
            <h2>User Percents</h2>
            <ul>
                {Object.entries(userPoints).map(([username, percentSum]) => (
                    <li key={username}>
                        User: {username} | Sum of Percents: {percentSum}
                    </li>
                ))}
            </ul>
        </div>
    )
};

LearnToEarnPageBase.propTypes = {
    intl: intlShape.isRequired,
};

export const LearnToEarnPage = injectIntl(LearnToEarnPageBase);
