import { Dialog, DialogTitle, 
  DialogContent, DialogActions, Button, TextField } from "@mui/material"
import {
  Row
} from "./styled"

const FilterModal = (props) => {
  const { opened, onOk, onCancel } = props

  return (
    <Dialog 
      open={opened} 
      onClose={onCancel}
      fullWidth={true}
      maxWidth="xs" >
      <DialogTitle>Filter Info</DialogTitle>
      <DialogContent>
        <Row>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Keyword"
            type="text"
            fullWidth
            variant="standard"
          />
        </Row>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} sx={{ textTransform: 'capitalize' }}>Cancel</Button>
        <Button onClick={onOk} sx={{ textTransform: 'capitalize' }}>Okay</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FilterModal