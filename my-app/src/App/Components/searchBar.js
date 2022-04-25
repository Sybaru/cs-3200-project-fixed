// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
// import SearchBar from "material-ui-search-bar";
// import axios, { Axios } from 'axios';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650
//   }
// });

// const Demo = () => {
//   const classes = useStyles();

//   const originalRows = all();

//   const [rows, setRows] = useState(originalRows);
//   const [searched, setSearched] = useState("");

//   const requestSearch = (searchedVal) => {
//     const filteredRows = originalRows.filter((row) => {
//       return row.name.toLowerCase().includes(searchedVal.toLowerCase());
//     });
//     setRows(filteredRows);
//   };

//   const cancelSearch = () => {
//     setSearched("");
//     requestSearch(searched);
//   };

//   return (
//     <>
//       <Paper>
//         <SearchBar
//           value={searched}
//           onChange={(searchVal) => requestSearch(searchVal)}
//           onCancelSearch={() => cancelSearch()}
//         />
//         <TableContainer>
//           <Table className={classes.table} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Food (100g serving)</TableCell>
//                 <TableCell align="right">id</TableCell>
//                 <TableCell align="right">Email&nbsp;(g)</TableCell>
//                 <TableCell align="right">Password&nbsp;(g)</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows.map((row) => (
//                 <TableRow key={row.name}>
//                   <TableCell component="th" scope="row">
//                     {row.name}
//                   </TableCell>
//                   <TableCell align="right">{row.id}</TableCell>
//                   <TableCell align="right">{row.email}</TableCell>
//                   <TableCell align="right">{row.password}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </>
//   );
// };

// export default Demo;
