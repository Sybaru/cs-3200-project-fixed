import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Signin from "./App/Containers/signin"
import Signup from "./App/Containers/signup"
import MainPage from "./App/Containers/dashboard"
import MyPlaylists from './App/Containers/playlistview.js'

window.user = 0;

export default class App extends React.Component {
    render() {
        return (
          <div className="App">
      <Routes>
        <Route path="/" element={<Signinfunc />} />
        <Route path="register" element={<Signupfunc />} />
        <Route path="main" element={<Mainfunc />} />
        <Route path="MyPlaylists" element={<MyPlaylist />} />
      </Routes>
    </div>
        )
    }
}

function Mainfunc() {
  return (
    <MainPage></MainPage>
  )
}

function Signinfunc() {
  return (
    <Signin></Signin>
  )
}

function Signupfunc() {
  return (
    <Signup>
    </Signup>
  )
}

function MyPlaylist() {
  return (
    <MyPlaylists></MyPlaylists>
  )
}