import { Client , Account , ID } from "appwrite";
import Config from "../Config/config"

export class AuthService {

    client = new Client()
    .setEndpoint(Config.appwriteUrl)
    .setProject(Config.appwriteProjectId);
    account

    constructor(){
        this.account = new Account(this.client);
    }
    async signUp({email , password , name}){
        try {
            const result = await this.account.create(ID.unique() , email , password , name);
            if(result){
                return result;
            }else{
                return false;
            }
        } catch (error) {
            console.log("Internal Server Error :: Signup",error);
            return false;
        }
    }

    async login({email , password}){
        try {
            const result = await this.account.createEmailSession(email , password);
            if(result) return result;
        } catch (error) {
            console.log("Internal Server Error :: Login");
        }
        return false;
    }

    async logout(){
        try {
            const result = await this.account.deleteSessions();
            if(result) return true;
            return false;
        } catch (error) {
            console.log("Internal Server Error :: Logout");
        }
    }
    async getCurrentUser() {
        try {
            const user = await this.account.get();
            
            if(user) return user;
            return false;
        } catch (error) {
            return false;
        }
    }
    async getUserDetails(userId){
        try {
            const user = await this.account.get(userId)
            if(user){
                return user;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    
}
const authService = new AuthService();
export default authService;