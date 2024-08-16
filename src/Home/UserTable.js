
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "./usersSlice";
import {
  CircularProgress,
  Button,
  Modal,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const UserTable = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.users);

  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddUser = () => {
    dispatch(addUser(newUser));
    handleClose();
    setNewUser({ name: "", email: "", phone: "" });
  };

  return (
    <div>
      <h1>User List</h1>

      {status === "loading" && <CircularProgress />}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Button variant="contained" onClick={handleOpen}>
        Add New User
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            p: 4,
            backgroundColor: "white",
            margin: "100px auto",
            width: 300,
          }}
        >
          <h2>Add User</h2>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          />
          <Button variant="contained" onClick={handleAddUser} >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UserTable;