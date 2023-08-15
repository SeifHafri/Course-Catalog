/*  eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BackgroundImage = ({ username }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = 'seif2';
        const apiUrl = `http://djezzy-academy.dz:8000/api/user/v1/accounts?username=${username}`;

        axios
            .get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                const imageUrl = response.data[0]?.profile_image?.image_url_medium;
                setImageUrl(imageUrl);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
                setIsLoading(false);
            });
    }, [username]);

    return (
        <div className="avatar" style={{ width: '40px', height: '40px' }}>
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                <div className="avatar" style={{ backgroundImage: `url(${imageUrl})` }} />
            )}
        </div>
    );
};

export default BackgroundImage;
