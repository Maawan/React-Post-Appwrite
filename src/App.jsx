import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { login, logout } from './store/userSlice';
import authService from './appwrite/AuthService';

function App() {

  const dispatch = useDispatch();
  useEffect( () => {
     handleUser();

  },[])

  async function handleUser(){
    console.log("Called ");
    const tempUser = localStorage.getItem("user");
     if(tempUser !== undefined && tempUser !== null){
        dispatch(login(JSON.parse(tempUser)));
        console.log("Data Retrieved");
     }
      const res = await authService.getCurrentUser();
      console.log("Checking " , res);
     if(res){
        dispatch(login(res));
        localStorage.setItem("user" , JSON.stringify(res));
     }else{
        dispatch(logout());
        localStorage.setItem("user" , JSON.stringify({
          isLoggedIn : false,
          userData : null
        }))
     }
  }


   return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
    
   )
  
}

export default App;
