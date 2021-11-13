import { useState } from 'react'
import { Dialog, DialogTitle, 
  DialogContent, DialogActions, Button, TextField } from "@mui/material"
import {
  Row
} from "./styled"

const NonprofitModal = (props) => {
  const { opened, onOk, onCancel } = props
  const [data, setData] = useState({ name: '', address: '', email: '', info: '' })

  const handleOkay = (e) => {
    e.preventDefault()

    if (data.name == '')
      return

    if (data.address == '')
      return

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
      <DialogTitle>Nonprofit Info</DialogTitle>
      <DialogContent>
        <Row>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={data.name}
            onChange={e => setData({ ...data, name: e.target.value })}
          />
        </Row>
        <Row>
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            value={data.address}
            onChange={e => setData({ ...data, address: e.target.value })}
          />
        </Row>
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
            onChange={e => setData({ ...data, email: e.target.value })}
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

export default NonprofitModal