import { 
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  FilterList as FilterListIcon,
  Send as SendIcon
} from "@mui/icons-material"

import { useState } from "react"
import { useSelector } from "react-redux"
import { Toolbar, Typography, Tooltip,
  IconButton, Popover, List, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"

import { alpha } from "@mui/material/styles"
import { MoreOptionWrapper } from "./styled"

import { selectLayout } from "../../redux/reducers/appSlice"

const TableToolbar = (props) => {
  const { numSelected, title, onAddClick, onFilterClick } = props;

  const currentLayout = useSelector(selectLayout)

  const [morePopupOptions, setMorePopupOptions] = useState({ opened: false, anchorEl: null })

  const moreOption = (e) => {
    setMorePopupOptions({ opened: true, anchorEl: e.currentTarget })
  }

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title ? title : 'List' }
          </Typography>
        )}
        {numSelected > 0 ? (
           currentLayout == 'compose' ? (
            <Tooltip title="Send">
              <IconButton onClick={onAddClick}>
                <SendIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )          
        ) : (
          <Tooltip title="More Optioins">
            <IconButton onClick={moreOption}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <Popover
        open={morePopupOptions.opened}
        anchorEl={morePopupOptions.anchorEl}
        onClose={() => setMorePopupOptions({ opened: false, anchorEl: null })}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <MoreOptionWrapper>
          <List>
            {(currentLayout != 'compose' && currentLayout != 'history')&&
            <ListItemButton onClick={onAddClick}>
              <ListItemIcon sx={{ minWidth: 50 }}>
                {currentLayout == 'history' ? <SendIcon /> : <AddIcon />}
              </ListItemIcon>
              <ListItemText>{currentLayout == 'history' ? 'Send' : 'Add'}</ListItemText>
            </ListItemButton>
            }
            
            <ListItemButton onClick={onFilterClick}>
              <ListItemIcon sx={{ minWidth: 50 }}><FilterListIcon /></ListItemIcon>
              <ListItemText>Filter</ListItemText>
            </ListItemButton>
          </List>
        </MoreOptionWrapper>  
      </Popover>
    </>
  );
};

export default TableToolbar