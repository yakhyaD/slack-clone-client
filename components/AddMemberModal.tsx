import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAddMemberMutation } from '../generated/graphql';


const AddMemberModal = ({ isOpen, setIsOpen, currentTeamId }) => {
    const [username, setUsername] = useState("");
    const [errorField, setErrorField] = useState(null)

    const [addMember] = useAddMemberMutation()

    const handleClick = async () => {
        setErrorField(null)
        if (!username) {
            setErrorField("Username is required")
            return;
        }
        const response = await addMember({
            variables: {
                username,
                teamId: parseInt(currentTeamId)
            },
        })
        if (response.data?.addMember.ok === false) {
            setErrorField(response.data.addMember.error)
            return;
        }
        setErrorField(null)
        setIsOpen(false);
    }


    return (
        <div >
            <Dialog fullWidth={true} maxWidth="sm" open={isOpen} onClose={() => setIsOpen(false)}>
                <DialogTitle>Add New Member</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name:"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={errorField !== null}
                        helperText={errorField}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={handleClick}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddMemberModal;
