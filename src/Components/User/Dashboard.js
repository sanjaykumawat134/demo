import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAllUsers , getDataForEdit,toggleDialog} from "../../store/action/userActions";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SimpleDialog from "../UI/SimpleDialog";
import Register from "../Auth/Register";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const Dashboard = (props) => {
  const { getAllUsers, users,getDataForEdit , toggleDialog} = props;
  React.useEffect(() => {
    const getData = async () => {
      await getAllUsers();
    };
    getData();
  }, []);
  const editUserHandler = (userId) =>()=> {
      getDataForEdit(userId)
  };
  return (
      <div className="flex">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="user list">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <StyledTableRow key={user._id}>
              <StyledTableCell>{user.name}</StyledTableCell>
              <StyledTableCell>{user.email}</StyledTableCell>
              <StyledTableCell>{user.phone}</StyledTableCell>
              <StyledTableCell>
                {" "}
                <Tooltip title="Edit ">
                  <IconButton
                    variant="contained"
                    color="primary"
                    onClick={editUserHandler(user._id)}
                    // startIcon={<EditIcon />}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {
        props.isDialogOpen && <SimpleDialog open ={props.isDialogOpen} onClose={toggleDialog}  title="Edit User" content ={<Register/> } />
    }
    </div>
    
    
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    isDialogOpen: state.user.isDialogOpen,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllUsers,
      getDataForEdit,
       toggleDialog
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
