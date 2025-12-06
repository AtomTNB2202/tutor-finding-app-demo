import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo + Title */}
        <Typography 
          variant="h6" 
          sx={{ cursor: "pointer", fontWeight: 600 }}
          onClick={() => navigate("/student")}
        >
          Tutor Support System
        </Typography>

        <Box>
          <Button
            variant="contained"
            size="small"
            onClick={handleLogout}
            sx={{
              backgroundColor: "#fff",
              color: "#1976d2",
              textTransform: "none",
              px: 2,
              "&:hover": { backgroundColor: "#e3e3e3" }
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
