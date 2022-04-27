import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Signin from "./App/Containers/signin"
import Signup from "./App/Containers/signup"
import MainPage from "./App/Containers/dashboard"
import MyPlaylists from './App/Containers/playlistview.js'
import EditPlaylists from './App/Containers/playlistedit.js'
import ViewAll from './App/Containers/playlistviewall'


export default class App extends React.Component {
    render() {
        return (
          <div className="App">
      <Routes>
        <Route path="/" element={<Signinfunc />} />
        <Route path="register" element={<Signupfunc />} />
        <Route path="main" element={<Mainfunc />} />
        <Route path="MyPlaylists" element={<MyPlaylist />} />
        <Route path="EditPlaylists" element={<EditPlaylist />} />
        <Route path="ViewAllLists" element={<ViewAllFunc />} />
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

function EditPlaylist() {
  return (
    <EditPlaylists>
    </EditPlaylists>
  )
} 

function ViewAllFunc() {
  return (
    <ViewAll>      
    </ViewAll>
  )
} 