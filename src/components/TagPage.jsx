import React from 'react'
import Header from './Header'
import { useLocation, useNavigate } from 'react-router-dom'
import Blogs from './Blogs';
import Pagination from './Pagination';

const TagPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const tag = location.pathname.split("/").at(-1);

    return (
        <div>
            <Header />
            <div>
                <button onClick={() => navigate(-1)}>
                    Back
                </button>
                <h2>
                    Blogs Tagged <span>#{tag}</span>
                </h2>
            </div>
            <Blogs />
            <Pagination />
        </div>
    )
}

export default TagPage