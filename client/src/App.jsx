import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import Layout from './pages/layout.jsx';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import NoPage from './pages/nopage.jsx';
import PostTrip from './pages/postTrip.jsx';
import TripSearch from './pages/searchTrip.jsx';
import SignUp from './pages/signup.jsx';
import Profile from './pages/profile.jsx';
import { AuthContextProvider } from './context-providers/authContext.jsx';
import React from 'react';

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/search-trip" element={<TripSearch />}></Route>
          <Route path="/post-trip" element={<PostTrip />}></Route>
          <Route path="*" element={<NoPage />}></Route>
        </Route>
      </>
    )
  )
  return (

    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>

  )
};

