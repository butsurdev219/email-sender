import { useState } from "react"

import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem,  
  Divider, ListItemText, Grid, Autocomplete, TextField, ListItemButton, Tooltip } from "@mui/material"
import { Close as CloseIcon, Delete as DeleteIcon, Preview as PreviewIcon } from "@mui/icons-material"
import {
  Row
} from "./styled"

const ComposeModal = (props) => {
  const { opened, onOk, onCancel } = props
  const [selectedFoundation, setSelectedFoundation] = useState(null)
  const [selectedNonprofitList, setSelectedNonprofitList] = useState([])

  const foundationList = [
    { id: 1, email: 'cupcake@gmail.com', info: '-' },
    { id: 2, email: 'donut@gmail.com', info: '-' },
    { id: 3, email: 'eclair@gmail.com', info: '-' },
    { id: 4, email: 'frozen-yoghurt@gmail.com', info: '-' },
    { id: 5, email: 'gingerbread@gmail.com', info: '-' },
    { id: 6, email: 'honeycomb@gmail.com', info: '-' },
    { id: 7, email: 'ice-cream@gmail.com', info: '-' },
    { id: 8, email: 'jelly-bean@gmail.com', info: '-' },
    { id: 9, email: 'kitKat@gmail.com', info: '-' },
    { id: 10, email: 'lollipop@gmail.com', info: '-' },
    { id: 11, email: 'marshmallow@gmail.com', info: '-' },
    { id: 12, email: 'nougat@gmail.com', info: '-' }
  ];

  const nonprofitList = [
    { id: 1, name: 'Cupcake', address: 'Address of Cupcake', email: 'cupcake@gmail.com', info: '-'},
    { id: 2, name: 'Donut', address: 'Address of Donut', email: 'donut@hotmail.com', info: '-'},
    { id: 3, name: 'Eclair', address: 'Address of Eclair', email: 'eclair@yahoo.com', info: '-'},
    { id: 4, name: 'Frozen yoghurt', address: 'Address of Frozen', email: 'frozen@gmail.com', info: '-'},
    { id: 5, name: 'Gingerbread', address: 'Address of Gingerbread', email: 'gingerbread@gmail.com', info: '-'},
    { id: 6, name: 'Honeycomb', address: 'Address of Cupcake', email: 'honeycomb@gmail.com', info: '-'},
    { id: 7, name: 'Ice cream sandwich', address: 'Address of Cream', email: 'cream@hotmail.com', info: '-'},
    { id: 8, name: 'Jelly Bean', address: 'Address of Jelly', email: 'jelly@gmail.com', info: '-'},
    { id: 9, name: 'KitKat', address: 'Address of KitKat', email: 'kikat@yahoo.com', info: '-'},
    { id: 10, name: 'Lollipop', address: 'Address of Lollipop', email: 'lollipop@yahoo.com', info: '-'},
    { id: 11, name: 'Marshmallow', address: 'Address of Marshmallow', email: 'marshmallow@hotmail.com', info: '-'},
    { id: 12, name: 'Nougat', address: 'Address of Nougat', email: 'nougat@gmail.com', info: '-'}
  ];

  const getNonprofitData = () => {
    const list = nonprofitList.map(v => { return {...v, label: v.name} })
    return list
  }

  const getFoundationList = () => {
    const list = foundationList.map(v => { return { ...v, label: v.email } })
    return list
  }

  const changeNonprofitData = (data) => {
    if (!data)
      return
      
    const t = selectedNonprofitList.filter(v => v.id == data.id)
    if (t.length > 0)
      return 
    
    setSelectedNonprofitList([...selectedNonprofitList, data])
  }

  const changeFoundationData = (data) => {
    if (!data)
      return
    setSelectedFoundation(data)
  }

  const deleteSelectedNonprofit = (id) => {
    const newList = selectedNonprofitList.filter(v => v.id != id)
    setSelectedNonprofitList(newList)
  }

  return (
    <Dialog 
      open={opened} 
      onClose={onCancel}
      fullWidth
      maxWidth="xl">
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onCancel}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Compose Box
          </Typography>
          <Button autoFocus color="inherit" 
            sx={{ textTransform: 'capitalize' }} 
            onClick={onCancel}>
            Send
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container
        sx={{
          marginLeft: 0,
          marginTop: 0,
          width: '100%'
        }} 
        spacing={2}>
        <Grid item xs={4}>
          <Row>
            <Typography variant="h6" nowrap component="div">From (Foundation)</Typography>
          </Row>
          <Row>
            <Autocomplete
              disablePortal
              id="sel-foundation"
              options={getFoundationList()}
              onChange={(e, v) => changeFoundationData(v)}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="Eamil" variant="standard" />}
            />
          </Row>
          <Row>
            <List>
              <ListItem sx={{ paddingLeft: 1 }}>
                <ListItemText 
                  primary={selectedFoundation ? selectedFoundation.email : "none"} 
                  secondary={selectedFoundation ? selectedFoundation.info : "-"}  />
                {selectedFoundation&& 
                  <ListItemButton 
                    sx={{ flexGrow: 0 }}
                    onClick={() => setSelectedFoundation(null)}
                    ><DeleteIcon /></ListItemButton>
                }
              </ListItem>
            </List>
          </Row>
        </Grid>
        <Grid item xs={8}>
          <Row>
            <Typography variant="h6" nowrap component="div">To (Nonprofit)</Typography>
          </Row>
          <Row>
            <Autocomplete
              disablePortal
              id="sel-foundation"
              options={getNonprofitData()}
              onChange={(e, v) => changeNonprofitData(v)}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="Name" variant="standard" />}
            />
          </Row>
          <Row>
            <List sx={{ height: 300, overflowY: 'auto' }}>
              {selectedNonprofitList&& selectedNonprofitList.map(data => (
                <div key={data.id}>
                  <ListItem sx={{ paddingLeft: 1 }}>
                    <ListItemText 
                      primary={data.name} 
                      secondary={`${data.address}, ${data.email}, ${data.info}`} />
                    <ListItemButton sx={{ flexGrow: 0 }}>
                      <Tooltip title={`Sending money to nonprofit ${data.name} at address ${data.address}.`}>
                        <PreviewIcon />
                      </Tooltip>
                    </ListItemButton>
                    <ListItemButton sx={{ flexGrow: 0 }} onClick={() => deleteSelectedNonprofit(data.id)}><DeleteIcon /></ListItemButton>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </Row>
        </Grid>
      </Grid>
      
    </Dialog>
  )
}

export default ComposeModal