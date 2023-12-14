import React, { useEffect, useState } from "react";
import postService from "../appwrite/PostService";
import { useDispatch } from "react-redux";
import { disableLoading, enableLoading } from "../store/loadingSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    
      dispatch(enableLoading());
      getAllPosts();
      
    
  }, [location.state]);


  const getAllPosts = async () => {
    console.log("Function is called ");
    setTimeout(async()=>{
      const res = await postService.getAllPosts();
      dispatch(disableLoading());
      console.log(res);
      setPosts(res);
    },1000)
    


  };
  

  return (
    <>
      <h2 className="mx-6 mt-4 text-3xl font-lumanosimo font-bold">All Posts</h2>
      <div className="w-full  flex flex-wrap  justify-center md:justify-normal ">
        
        {
        posts.documents !== undefined &&  posts?.documents.map((post) => (
          <div key={post.$id} 
            onClick={(e) => {
              navigate(`post/${post.slug}`)
            }}
          className="w-[230px] m-4 h-[250px] shadow transition-all duration-300 hover:shadow-lg border rounded-lg overflow-hidden">
            <img
              className="h-[125px] w-screen"
              src={postService.getFilePreview(post.featuredImage)}
              alt=""
            />
            <p className="text-md  ml-2 mt-2 font-lumanosimo font-bold">
              {post.title} 
            </p>
            {post.content.length > 110 ? (
              <p className="text-[12px] mx-2 overflow-hidden">
                {getFirst100Chars(post.content)}{" "}
                <span className="text-blue-600 font-semibold cursor-pointer">
                  Read more
                </span>
              </p>
            ) : (
              <p className="text-[12px] mx-2">{post.content}</p>
            )}
            <p>{post.userId} this is the owner</p>
          </div>
        ))}
      </div>
    </>
  );
};
function getFirst100Chars(str) {
  return str.substring(0, 110) + "...";
}

export default Posts;
