import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import AddCircleIcon from "@mui/icons-material/AddCircle"; // Import the icon
import Typography from "@mui/material/Typography"; // Import Typography

const columns = [
  { id: "serialNumber", label: "Serial No.", minWidth: 50 },
  { id: "title", label: "Title", minWidth: 100 },
  { id: "description", label: "Description", minWidth: 100 },
  { id: "author", label: "Author", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100 },
];

export default function NotesMaterial() {
  const { auth, setAuth } = useAuth();
  const [pdfs, setPDFs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-pdfs");
        console.log(response.data);
        setPDFs(
          response.data.map((pdf, index) => ({
            serialNumber: index + 1,
            title: pdf.title,
            description: pdf.description,
            author: pdf.name, // Assuming 'name' is the field for author
            _id: pdf._id,
          }))
        );
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    if (pdfs.length === 0) {
      fetchData();
    }
  }, [pdfs]);

  console.log(pdfs);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          style={{
            display: "inline-block",
            marginTop: "30px",
            marginLeft: "60px",
            fontFamily: "nunito",
            fontWeight: "bold",
          }}
        >
          Study Materials
        </Typography>
        {/* <Link to="/notes-share-form">
          <Button
            variant="contained"
            color="primary"
            style={{
              marginTop: "30px",
              paddingLeft: "90px",
              paddingRight: "90px",
              marginRight: "50px",
            }}
            startIcon={<AddCircleIcon />} // Add the icon
          >
            Add
          </Button>
        </Link> */}
      </div>
      <Paper
        sx={{
          width: "94%",
          overflow: "hidden",
          marginTop: "40px",
          marginLeft: "40px",
          marginRight: "40px",
          marginBottom: "100px",
          position: "relative",
        }}
      >
        <TableContainer
          sx={{
            maxHeight: 600,
            paddingLeft: "30px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        minWidth: column.minWidth,
                        position: "sticky",
                        top: 0,
                        backgroundColor: "white",
                        zIndex: 100,
                        fontWeight: "bold",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {pdfs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.serialNumber}>
                      <TableCell>{row.serialNumber}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.author}</TableCell>
                      <TableCell>
                        <Button
                          className="download-button"
                          variant="contained"
                          color="primary"
                          component={Link}
                          to={`http://localhost:5000/notes/download/${row._id}`}
                          download
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 25, 100]}
          component="div"
          count={pdfs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
