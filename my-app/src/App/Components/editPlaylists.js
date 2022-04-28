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

var currPlaylist = 0;

function setCurr(value) {
  currPlaylist = value;
}

function getCurr() {
  return currPlaylist
}

function MyPlaylists() {

  var columns = [
    {title: "Playlist id", field: "list_id", hidden: true},
    {title: "Playlist name", field: "playlist_title"},
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

  var columnsSongs = [
    { title: "Song Id", field: "song_id", hidden: true},
    { title: "Song", field: "song_name" },
    { title: "Genre", field: "genre" },
    { title: "Duration", field: "song_length" },
    { title: "Artist", field: "artist_name" },
    { title: "Record Label", field: "label_name"},
  ]
  const [dataSongs, setDataSongs] = useState([]); //PLaylist data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  const [listName, setName] = useState([]); //PLaylist name

  useEffect(() => {
    axios.post('http://localhost:3001/allMy'
    ).then(response => {
        setData(response.data)
    }).catch(error=>{
        console.log(error)
    })
    axios.post('http://localhost:3001/indivList', {
        playlistId: getCurr(),
       }).then(response => {
         setDataIndiv(response.data)
        }).catch(error=>{
          console.log(error)
        })
    axios.post('http://localhost:3001/all').then(response => {
          setDataSongs(response.data)
      }).catch(error=>{
          console.log(error)
      })
    setName("No Playlist selected")  
  }, [])

  const handleRowDelete = (oldData, resolve) => {
    
    axios.post('http://localhost:3001/deleteSong', {
        playlistId: getCurr(),
        songId: oldData.song_id,
      }).then(res => {
        const dataDelete = [...dataIndiv];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setDataIndiv([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }


  return (
    <div className="MyPlaylists">
      
      <Grid container spacing={1}>
          <Grid item xs={12}>
            <MaterialTable
              title="Playlists"
              columns={columns}
              data={data}
              icons={tableIcons}
              actions={[
                {
                icon: Edit,
                tooltip: 'Edit Playlist',
                onClick: (event, rowData) => {
                  setCurr(rowData.list_id);
                  axios.post('http://localhost:3001/indivList', {
                    playlistId: getCurr(),
                  }).then(response => {
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
              editable={{
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve)
                  }),
              }}
            />
          </Grid>
          <Grid item xs={12}>
          <MaterialTable
              title="Add Songs to Current Playlist"
              columns={columnsSongs}
              data={dataSongs}
              icons={tableIcons}
              actions={[
                {
                icon: AddBox,
                tooltip: 'Add song to Current Playlist',
                onClick: (event, rowData) => {
                  console.log(getCurr());
                  axios.post('http://localhost:3001/addToPlaylist', {
                    playlistId: getCurr(),
                    songId: rowData.song_id
                  }).then(response => {
                    axios.post('http://localhost:3001/indivList', {
                    playlistId: getCurr(),
                  }).then(response => {
                    setDataIndiv(response.data)
                  }).catch(error=>{
                    console.log(error)
                  })
                  }).catch(error=>{
                  })
                }
              }
            ]}
            />
          </Grid>
        </Grid>
    </div>
  );
}

export default MyPlaylists;