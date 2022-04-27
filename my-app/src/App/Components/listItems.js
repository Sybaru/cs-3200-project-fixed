import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListIcon from '@mui/icons-material/List';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import CreateIcon from '@mui/icons-material/Create';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import axios, { Axios } from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const logout = () => {
  axios.post('http://localhost:3001/logout', {
}).then((response) => {
  console.log(response);
});
};

const deleteAcc = () => {
  axios.post('http://localhost:3001/deleteAcc', {
}).then((response) => {
  console.log(response);
});
};

export const mainListItems = (
  <React.Fragment>
    <ListItemButton button component="a" href='/main'>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Search All Songs" />
    </ListItemButton>
    <ListItemButton button component="a" href='/MyPlaylists'>
      <ListItemIcon>
        <PlaylistAddIcon />
      </ListItemIcon>
      <ListItemText primary="My Playlists" />
    </ListItemButton>
    <ListItemButton button component="a" href='/EditPlaylists'>
      <ListItemIcon>
        <CreateIcon />
      </ListItemIcon>
      <ListItemText primary="Edit playlists" />
    </ListItemButton>
    <ListItemButton button component="a" href='/ViewAllLists'>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="All playlists" />
    </ListItemButton>
    <ListItemButton button component="a" href='/rankings'>
      <ListItemIcon>
        <QueueMusicIcon />
      </ListItemIcon>
      <ListItemText primary="Rankings" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Options
    </ListSubheader>
    <ListItemButton button component="a" href='/' onClick={logout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Sign out" />
    </ListItemButton>
    <ListItemButton button component="a" href='/' onClick={deleteAcc}>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText style={{color: "red"}} primary="Delete Account" />
    </ListItemButton>
  </React.Fragment>
);