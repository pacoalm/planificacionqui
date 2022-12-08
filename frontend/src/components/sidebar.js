import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ConfigIcon from "@mui/icons-material/BuildCircleTwoTone";

export default function Sidebar(props) {
    const [state, setState] = useState(true);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState(open);

        if (!open) props.handleClose(event, 0);
    };

    const handleAbreConfig = (event) => {
        props.handleClose(event, 1);
    };

    const list = () => (
        <Box
            sx={{
                width: 250,
                height: "100%",
                backgroundColor: "navy",
                color: "white",
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map(
                    (text, index) => (
                        <ListItem
                            key={text}
                            disablePadding
                            sx={{ fontFamily: "Open Sans" }}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon sx={{ color: "white" }} />
                                    ) : (
                                        <MailIcon sx={{ color: "white" }} />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    )
                )}
            </List>
            <Divider />
            <List>
                <ListItem
                    key={"config"}
                    disablePadding
                    onClick={() => {
                        handleAbreConfig();
                    }}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <ConfigIcon sx={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText primary="Configuración" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment key="left">
                <Drawer
                    anchor={"left"}
                    open={true}
                    onClose={toggleDrawer(false)}
                >
                    {list("left")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
