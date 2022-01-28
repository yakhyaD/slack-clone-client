import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useCreateChannelMutation } from '../generated/graphql';

// interface addChannelModalProps = {
//     isOpen: boolean,
//     setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
//     currentTeamId: string
// }

const AddChannelModal = ({ isOpen, setIsOpen, currentTeamId }) => {
    const [name, setName] = useState("");
    const [errorField, setErrorField] = useState(null)

    const [createChannel] = useCreateChannelMutation()

    const handleClick = async () => {
        setErrorField(null)
        if (name.length < 3) {
            setErrorField("Channel name must be at least 3 characters long")
            return
        }
        // name contains only letters and no numbers
        const regex = /^[A-Za-z\s]+$/;
        if (!regex.test(name)) {
            setErrorField("Invalid channel name. Name contains only letters and no numbers")
            return
        }
        // addChannelMuation
        const response = await createChannel({
            variables: {
                name,
                teamId: parseInt(currentTeamId)
            },
            update: (cache) => {
                cache.evict({ id: "Team:" + parseInt(currentTeamId) })
            }
        })
        if (response.data?.createChannel?.ok === false) {
            setErrorField(response.data!.createChannel!.error)
            return
        }
        setErrorField(null)
        setIsOpen(false);
    }


    return (
        <div >
            <Dialog fullWidth={true} maxWidth="sm" open={isOpen} onClose={() => setIsOpen(false)}>
                <DialogTitle>Create New Channel</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name:"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={errorField !== null}
                        helperText={errorField}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={handleClick}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddChannelModal;
