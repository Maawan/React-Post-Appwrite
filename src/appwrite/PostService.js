import { Client, Databases, ID , Storage } from "appwrite";
import Config from "../Config/config";
import { login } from "../store/userSlice";

export class PostService {
  client = new Client()
    .setEndpoint(Config.appwriteUrl)
    .setProject(Config.appwriteProjectId);
  databases;
  storage

  constructor() {
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async getAllPosts() {
    try {
      const result = await this.databases.listDocuments(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionId
      );
      return result;
    } catch (error) {
      return false;
    }
  }

  async uploadFile(file){
    try {
        const res = await this.storage.createFile(
            Config.appwriteBucketId,
            ID.unique(),
            file
        )
        if(res) return res;
        return false;
    } catch (error) {
        return false;
    }
  }

  async getPost({ slug }) {
    try {
      const result = await this.databases.getDocument(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionId,
        slug
      );
      if (!result) return false;
      return result;
    } catch (error) {
      return false;
    }
  }

  getFilePreview(fileId){
    
      const res = this.storage.getFilePreview(Config.appwriteBucketId , fileId);
      if(res) return res;
      return false;
    
  }

  async addPost({title , content , slug , featuredImage , userId}){
    try {
        const featuredImageId = await this.uploadFile(featuredImage);
        const res = this.databases.createDocument(
            Config.appwriteDatabaseId,
            Config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage : featuredImageId.$id,
                userId
            }
        )
        if(res) return true;
        return false;
    } catch (error) {
        return false;
    }
  }

  async isSlugAvailable(slug){
    try {
      const res = await this.databases.getDocument(Config.appwriteDatabaseId , Config.appwriteCollectionId,slug);
      console.log("Result from checking is " , res);
      if(!res) return true;
      return false;
    } catch (error) {
      console.log(error);
      return true;
    }
  }

}

const postService = new PostService();
export default postService;
