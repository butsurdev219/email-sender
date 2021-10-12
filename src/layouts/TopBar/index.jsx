import { Box, CssBaseline, AppBar, Toolbar, IconButton, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { 
  TopBarWrapper
} from "./styled"

const TopBar = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - 200px)` },
          ml: { sm: `200px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            // onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Email Sender
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar