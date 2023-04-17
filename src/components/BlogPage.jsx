import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { useLocation, useNavigate } from 'react-router-dom'
import Blogs from './Blogs';
import { AppContext } from '../context/AppContext';
import BlogDetails from './BlogDetails';


const BlogPage = () => {
    const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const { loading, setLoading } = useContext(AppContext);

    const navigate = useNavigate();
    const location = useLocation();

    const blogId = location.pathname.split("/").at(-1);


    async function fetchRelatedBlogs() {
        setLoading(true);
        let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
        try {
            const result = await fetch(url);
            const data = await result.json();

            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);

        } catch (error) {
            console.log("Data not fetch", error);
            setBlog(null);
            setRelatedBlogs([]);

        }
        setLoading(false);
    }

    useEffect(() => {
        if (blogId) {
            fetchRelatedBlogs();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    return (
        <div>
            <Header />
            <div>
                <button onClick={() => navigate(-1)}>
                    Back
                </button>
                {
                    loading ?
                        (<div>
                            <p>Loading</p>
                        </div>) :
                        blog ?
                            (<div><BlogDetails post={blog} />
                                <h2>Related Blogs</h2>{
                                    relatedBlogs.map((post) => (
                                        <div key={post.id}>
                                            <BlogDetails post={post} />
                                        </div>
                                    ))
                                }
                            </div>) : (<div>
                                <p>No Blog Found</p>
                            </div>)
                }
            </div>
        </div>
    )
}

export default BlogPage


    // < div key = { post.id } className = "w-11/12 max-w-2xl mx-auto" >
    //         <p className="font-bold text-lg">{post.title}</p>
    //         <p className="text-sm my-1">
    //           By <span className="italic">{post.author}</span> on{" "}
    //           <span className="font-semibold underline cursor-pointer">{post.category}</span>
    //         </p>
    //         <p className="text-sm">Posted On {post.date}</p>
    //         <p className="mt-4 mb-2">{post.content}</p>
    //         <div className="flex flex-wrap gap-x-2 items-center">
    //           {post.tags.map((tag, index) => (
    //             <span
    //               key={index}
    //               className="text-xs font-semibold underline text-blue-700 cursor-pointer">{`#${tag}`}</span>
    //           ))}
    //         </div>
    //       </ >