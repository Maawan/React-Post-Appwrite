import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Input from "../components/Input";
import ButtonSubmit from "../components/ButtonSubmit";
import postService from "../appwrite/PostService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { disableLoading, enableLoading } from "../store/loadingSlice";
import toast, { CheckmarkIcon } from "react-hot-toast";
import { SpinnerCircular } from "spinners-react";
import { HashLoader, SyncLoader } from "react-spinners";


const AddPost = () => {
  const editorRef = useRef(null);
  const [slug , setSlug] = useState("");
  const [title , setTitle] = useState("");
  const imageRef = useRef(null);
  const [imageFile , setImageFile]  = useState();
  const [imagePreview , setImagePreview] = useState();
  const [content , setContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [slugAvailable,setSlugAvailable] = useState(false);
  
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    let tempSlug = "";
    for(let i = 0 ; i < title.length ; i++){
      if( (title[i] >= 'a' && title[i] <= 'z') ||  (title[i] >= 'A' && title[i] <= 'Z') || (title[i] >= '0' && title[i] <= '9') ){
        tempSlug += title[i].toLowerCase();
      }else{
        if(tempSlug !== ""){
          if(tempSlug[tempSlug.length - 1] !== '-'){
            tempSlug += "-";
          }
        }
      }
    }
    setSlug(tempSlug)
  } , [title]);

  useEffect(() => {
    setSlugAvailable(false);
    isSlugAvailable();

  } , [slug])

  const isSlugAvailable = () => {
    if(slug !== ""){
      console.log("Checking for slug");
      postService.isSlugAvailable(slug).then((res) => {
        console.log("Result is " , res);
        setSlugAvailable(res);
      }).catch((err) => {
        setSlugAvailable(false);
      })
    }else{
      setSlugAvailable(false)
    }
  }

  return (
    <>
      <div className="flex flex-col w-full md:flex-row sm:flex-col ">
        <div className="w-full md:w-2/3  flex flex-col p-4">
          <Input
            placeholder={"Enter the Titile"}
            className={"m-4 border-2 rounded-md h-10 pl-4 font-lumanosimo"}
            onChange = {(e) => {
              setTitle(e.target.value)
            }}
            value = {title}
          />
          <Input
            placeholder={"slug"}
            className={"mx-4 border-2 rounded-md h-10 pl-4 font-lumanosimo"}
            disabled
            value={slug}
          />
          <div className="flex mx-5 my-2">
            <p className="text-gray-500 pr-2">Cheking for slug availibilty</p>
            {
              slugAvailable ? (<CheckmarkIcon />) : (<HashLoader color="#36d7b7" loading size={20}/>)
            }
          </div>
          <div className="mx-3">
            <Editor
              apiKey="d08jkuixebwqgeu7odwj3x66k3s3e6yxw445wk04ivijue41"
              ref={editorRef}
              initialValue="Welcome to TinyMCE!"
              onEditorChange={(newValue , editor) => {
                setContent(editor.getContent());
              }}
            />
          </div>
        </div>

        <div className="w-full md:w-1/3 flex-col py-4 flex items-center md:items-start">


              <img className="w-[300px] h-[200px] border-4 rounded-xl" src={imagePreview} alt="" ref={imageRef} />
              <Input className={"mt-4"} type={"file"} onChange={(e) => {
                setImagePreview(URL.createObjectURL(e.target.files[0]));
                setImageFile(e.target.files[0]);
              }} />
              <ButtonSubmit
                className={"w-[300px] h-10 border mt-4 rounded-md bg-blue-500 text-white font-semibold transition-all duration-500 hover:bg-blue-700 active:bg-green-600"
              }
                onClick={ async(e) => {
                  dispatch(enableLoading());
                  const res = await postService.addPost({title , slug , content , 
                  featuredImage : imageFile , userId : "null"})
                  if(res){
                    toast.success("Your post have been published successfully :)")
                    console.log(res);
                    console.log("Data inserted successfully ");
                  }
                  dispatch(disableLoading());
                  navigate("/" , {
                    state : {
                      refresh : true
                    }
                  })
                }}
              >Submit</ButtonSubmit>

        </div>
      </div>
    </>
  );
};

export default AddPost;
