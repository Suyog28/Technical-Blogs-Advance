import React from 'react'
import Header from './Header'
import Blogs from './Blogs'
import Pagination from './Pagination'

const Home = () => {
    return (
        <div> <Header />
            <div className="my-[100px]">
                <Blogs />
                <Pagination />
            </div></div>
    )
}

export default Home