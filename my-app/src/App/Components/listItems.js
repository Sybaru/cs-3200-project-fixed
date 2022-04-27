import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListIcon from '@mui/icons-material/List';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CreateIcon from '@mui/icons-material/Create';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SearchIcon from '@mui/icons-material/Search';

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
    <ListItemButton>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="My playlists" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <QueueMusicIcon />
      </ListItemIcon>
      <ListItemText primary="All playlists" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="more" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="options" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="here" />
    </ListItemButton>
  </React.Fragment>
);