import { useState } from "react"
import { Dialog, DialogTitle, 
  DialogContent, DialogActions, Button, TextField } from "@mui/material"
import {
  Row
} from "./styled"

const FoundationModal = (props) => {
  const [data, setData] = useState({email: '', info: ''})
  const { opened, onOk, onCancel } = props

  const handleOkay = () => {
    if (data.email == '')
      return
    
    if (data.info == '')
      return
      
    onOk(data)
  }
  return (
    <Dialog 
      open={opened} 
      onClose={onCancel}
      fullWidth={true}
      maxWidth="xs" >
      <DialogTitle>Foundation Info</DialogTitle>
      <DialogContent>
        <Row>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={data.email}
            onChange={e => setData({...data, email: e.target.value})}
          />
        </Row>
        <Row>
          <TextField
            autoFocus
            margin="dense"
            id="info"
            label="Information"
            type="text"
            fullWidth
            variant="standard"
            value={data.info}
            onChange={e => setData({ ...data, info: e.target.value })}
          />
        </Row>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} sx={{ textTransform: 'capitalize' }}>Cancel</Button>
        <Button onClick={handleOkay} sx={{ textTransform: 'capitalize' }}>Okay</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FoundationModal