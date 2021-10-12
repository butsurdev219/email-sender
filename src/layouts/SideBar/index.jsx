import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Drawer, Box, Toolbar, Divider,
  List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { Link, Navigate } from "react-router-dom"
import { setLayout, selectLayout } from "../../redux/reducers/appSlice" 
import {
  SideBarWrapper
} from "./styled"

const SideBar = () => {
  const navigator = useNavigate()
  const dispatch = useDispatch()
  const currentLayout = useSelector(selectLayout)

  const navigate = (path) => {
    dispatch(setLayout(path))
    navigator(`/${path}`)
  }
  return (
    <SideBarWrapper>
      <Box
        component="nav"
        sx={{ width: { sm: 200 }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 200 },
          }}
        >
          <Toolbar />
          <Divider />
          <List>
            <ListItem disablePadding
              sx={{
                backgroundColor: currentLayout == 'compose' ? 'purple' : ''
              }}>
              <ListItemButton onClick={() => navigate('compose')}>
                <ListItemText
                  sx={{
                    color: currentLayout == 'compose' ? 'white' : ''
                  }}>
                Compose
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding
              sx={{
                backgroundColor: currentLayout == 'foundation' ? 'purple' : ''
              }}>
              <ListItemButton onClick={() => navigate('foundation')}>
                <ListItemText
                  sx={{
                    color: currentLayout == 'foundation' ? 'white' : ''
                  }}>
                Foundation
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding
              sx={{
                backgroundColor: currentLayout == 'nonprofit' ? 'purple' : ''
              }}>
              <ListItemButton onClick={() => navigate('nonprofit')}>
                <ListItemText
                  sx={{
                    color: currentLayout == 'nonprofit' ? 'white' : ''
                  }}>
                  Nonprofit
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding
              sx={{
                backgroundColor: currentLayout == 'history' ? 'purple' : ''
              }}>
              <ListItemButton onClick={() => navigate('history')}>
                <ListItemText
                  sx={{
                    color: currentLayout == 'history' ? 'white' : ''
                  }}>
                  History
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </SideBarWrapper>
  )
}

export default SideBar