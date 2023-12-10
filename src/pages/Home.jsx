import React from 'react'
import { useDispatch } from 'react-redux'
import { enableLoading } from '../store/loadingSlice';
import Posts from '../components/Posts';
const Home = () => {
    const dispatch = useDispatch();
  return (
    <div>
        
        <Posts />
    </div>
  )
}

export default Home