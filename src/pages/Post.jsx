import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postService from "../appwrite/PostService";
import { useDispatch } from "react-redux";
import { enableLoading, disableLoading } from "../store/loadingSlice";
import parse from "html-react-parser"

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [post, setPost] = useState();
  const [image, setImage] = useState();
  const [resourseNotAvailable, setResourseNotAvailable] = useState(false);
  useEffect(() => {
    getPostData();
  }, []);

  const getPostData = async () => {
    dispatch(enableLoading());
    const res = await postService.getPost({ slug: id });

    if (!res) {
      setResourseNotAvailable(true);
      navigate("/404");
    } else {
      setResourseNotAvailable(false);
      const imageResult = await postService.getFileView(res?.featuredImage);
      if (imageResult) {
        console.log(
          "Image re " + typeof imageResult + " " + JSON.stringify(imageResult)
        );
        setImage(imageResult);
      }
      setPost(res);
      console.log("Your Post is ", res);
    }
    dispatch(disableLoading());
  };

  return (
    <div className="w-full p-10">
      {post !== undefined && (
        <div>
          <img src={image} className="w-[500px] h-[250px] border" alt="" />

          <h1 className="my-4 text-xl font-semibold text-gray-800">
            {post.title}
          </h1>
          {
            parse(post.content)
          }
        </div>
      )}
    </div>
  );
};

export default Post;
