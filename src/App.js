import { Routes, Route } from 'react-router-dom'
import React from 'react';

import Authentication from './Components/authentication/login';
import Home from './Components/Home/Home';
import Trending from './Components/Trending/Trending';
import Gaming from './Components/Gaming/Gaming';
import VideoDetails from './Components/VideoDetails/VideoDetails';
import SavedVideos from './Components/SavedVideos/SavedVideos';

import { ThemeProvider } from './ThemeContext';

import './App.css';

function App() {
  return (
    <ThemeProvider>
    <div className='app'>
      <Routes>
        <Route exact path='/auth' element={<Authentication />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/trending' element={<Trending />}></Route>
        <Route path='/gaming' element={<Gaming />}></Route>
        <Route path='/videos/:videoId' element={<VideoDetails />}></Route>
        <Route path='/saved' element={<SavedVideos />}></Route>
      </Routes>
    </div>
    </ThemeProvider>
  )
};

export default App;