import { IconButton, Avatar, Menu, MenuItem, Divider, ListItemIcon, ListItemText } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import { Logout } from '@mui/icons-material';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';


interface ProfileDetailsProps {}

const ProfileDetails: FC<ProfileDetailsProps> = () => {
  const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [user, loading, error] = useAuthState(auth);

    const [displayName, setDisplayName] = useState<any>();
    const [email, setEmail] = useState<any>();
    const [profilePic, setProfilePic] = useState<any>();

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("Logged out successfully!");
            // Optionally, redirect to login page or handle UI changes
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    useEffect(() => {
        setDisplayName(user?.displayName);
        setEmail(user?.email)
        setProfilePic(user?.photoURL)
    }, [user])

    return (
        <div>
            <IconButton onClick={handleClick} size="large" sx={{ color: 'inherit' }}>
                <Avatar src={profilePic} alt="Profile" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
            >
                <MenuItem>
                    <Avatar src={profilePic} /> Profile
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{displayName}</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <EmailIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{email}</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <InfoIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>More Info...</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize='small'/>
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
  
}
;

export default ProfileDetails;
