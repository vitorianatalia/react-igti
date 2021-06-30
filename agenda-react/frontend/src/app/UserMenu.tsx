import { Avatar, Box, Icon, IconButton } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useState } from "react";
import { signOutEndpoint } from "./backend";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthContext } from "./authContext";

const useStyles = makeStyles({
  userDetails: {
    padding: "16px",
    borderBottom: "1px solid rgb(224, 224, 224)",
    marginBottom: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      marginBottom: "8px",
    },
  },
});

export default function UserMenu() {
  const { user, onSignOut } = useAuthContext();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function signOut() {
    signOutEndpoint();
    onSignOut();
  }

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        aria-label="Usuário"
      >
        <Avatar>
          <Icon>person</Icon>
        </Avatar>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box className={classes.userDetails}>
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
          <div>{user.name}</div>
          <small>{user.email}</small>
        </Box>
        <MenuItem onClick={signOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
}
