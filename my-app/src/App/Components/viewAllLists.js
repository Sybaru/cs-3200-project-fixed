import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import Grid from '@material-ui/core/Grid'

import MaterialTable from "material-table";
import AddBox from '@mui/icons-material/AddBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import { Co2Sharp } from '@mui/icons-material';


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

var currlist = 0;

function setCurrList(value) {
  currlist = value;
}

function getCurrList() {
  return currlist
}

function MyPlaylists() {

  var columns = [
    {title: "Playlist id", field: "list_id", hidden: true},
    {title: "Playlist name", field: "playlist_title"},
    {title: "Creator", field: "userName"},
  ]
  const [data, setData] = useState([]); //table data

  var columnsIndiv = [
    { title: "Song Id", field: "song_id", hidden: true},
    { title: "Song", field: "song_name" },
    { title: "Genre", field: "genre" },
    { title: "Duration", field: "song_length" },
    { title: "Artist", field: "artist_name" },
    { title: "Record Label", field: "label_name"},
  ]
  const [dataIndiv, setDataIndiv] = useState([]); //PLaylist data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  const [listName, setName] = useState([]); //PLaylist name

  useEffect(() => {
    axios.post('http://localhost:3001/allLists'
    ).then(response => {
        setData(response.data)
    }).catch(error=>{
        console.log(error)
    })
    axios.post('http://localhost:3001/indivList', {
        playlistId: getCurrList(),
       }).then(response => {
         setDataIndiv(response.data)
        }).catch(error=>{
          console.log(error)
        })
    setName("No Playlist selected")  
  }, [])


  return (
    <div className="MyPlaylists">
      
      <Grid container spacing={1}>
          <Grid item xs={12}>
            <MaterialTable
              title="All Playlists"
              columns={columns}
              data={data}
              icons={tableIcons}
              actions={[
                {
                icon: Search,
                tooltip: 'View Playlist',
                onClick: (event, rowData) => {
                  console.log(rowData);
                  setCurrList(rowData.list_id);
                  axios.post('http://localhost:3001/indivList', {
                    playlistId: getCurrList(),
                  }).then(response => {
                    console.log(response);
                    setDataIndiv(response.data)
                    setName("Current Playlist: " + rowData.playlist_title)
                  }).catch(error=>{
                    console.log(error)
                  })
              }
            }
          ]}
            />
          </Grid>
          <Grid item xs={12}>
          <MaterialTable
              title={listName}
              columns={columnsIndiv}
              data={dataIndiv}
              icons={tableIcons}
            />
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid>
    </div>
  );
}

export default MyPlaylists;