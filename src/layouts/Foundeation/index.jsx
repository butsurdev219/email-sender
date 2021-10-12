import TableToolbar from "../../components/TableToolbar"
import TableHeader from "../../components/TableHeader"
import FoundationModal from "../../modals/FoundationModal"
import FilterModal from "../../modals/FilterModal"

import { useState, useEffect } from "react"
import { Grid, Card, Typography, 
  TableContainer, Table, TableBody, TableCell, Checkbox, TableRow, 
  Paper, TablePagination, IconButton } from "@mui/material"
import { Delete as DeleteIcon } from "@mui/icons-material"
import { FoundationWrapper } from "./styled"
import { Message, PerPageCountList } from "../../common/constants"
import { toast } from "react-toastify"
import { getFoundationList, saveFoundationData, deleteFoundationData } from "../../common/services"

const Foundation = () => {
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [selected, setSelected] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filterPopupOptions, setFilterPopupOptions] = useState({ opened: false })
  const [foundationPopupOptions, setFoundationPopupOptions] = useState({ opened: false })
  const [foundationList, setFoundationList] = useState([])

  let inited = false
  const getFoundationData = (keyword) => {
    getFoundationList('').then(res => {
      if (!res) {
        toast.error(Message.SERVER_ERROR)
        return
      }

      setFoundationList(res)
    })
  }

  useEffect(() => {
    if (inited) {
      return
    }

    inited = true

    getFoundationData('')
  }, [])

  const headCells = [
    {
      id: 'email',
      numeric: false,
      disablePadding: true,
      label: 'Email',
    },
    {
      id: 'information',
      numeric: false,
      disablePadding: false,
      label: 'Infomation',
    },
    {
      id: 'func',
      numeric: false,
      disablePadding: false,
      label: '',
    },
  ]


  const isSelected = (id) => selected.indexOf(id) !== -1

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = foundationList.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClicked = (e, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  const showFilterPopup = () => {
    setFilterPopupOptions({ opened: true })
  }
  
  const showFoundationPopup = () => {
    setFoundationPopupOptions({ opened: true })
  }

  const handleSearch = (keyword) => {

  }

  const handleSave = (data) => {
    setFoundationPopupOptions({ opened: false })
    saveFoundationData(data).then(res => {
      if (!res || !res.success) {
        toast.error(Message.SERVER_ERROR)
        return
      }

      setFoundationList([{ id: foundationList.length, ...data }, ...foundationList])
      toast.success(Message.SUCCEED_SAVE_DATA)
    })
  }

  const handleDelete = (e, id) => {
    e.preventDefault()

    deleteFoundationData(id).then(res => {
      if (!res || !res.success) {
        toast.error(Message.SERVER_ERROR)
        return
      }

      const new_ = foundationList.filter(v => v.id !== id)
      setFoundationList(new_)
      toast.success(Message.SUCCEED_DELETE_DATA)
    })
  }

  return (
    <>
      <FoundationWrapper>
        <Typography variant="h6" nowrap component="div">Foundation</Typography>
        <Grid contianer 
          sx={{ pt: 2 }}>
          <Card sx={{ p: 2 }}>
            <TableToolbar 
              numSelected={selected.length}
              onFilterClick={showFilterPopup}
              onAddClick={showFoundationPopup} />
            <Paper>
              <TableContainer>
                <Table>
                  <TableHeader 
                    headCells={headCells} 
                    numSelected={selected.length} 
                    rowCount={foundationList.length}
                    onSelectAllClick={handleSelectAllClick} />
                  <TableBody>
                  { foundationList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `row-${index}`;
                    return (
                      <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onClick={(e) => handleClicked(e, row.id)}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="center"
                          >
                            {row.email}
                          </TableCell>
                          <TableCell align="center">{row.info}</TableCell>
                          <TableCell align="center"><IconButton onClick={(e) => handleDelete(e, row.id)}><DeleteIcon /></IconButton></TableCell>
                        </TableRow>
                    )
                  }) }
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={PerPageCountList}
                component="div"
                count={foundationList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Card>
        </Grid>
      </FoundationWrapper>
      <FilterModal opened={filterPopupOptions.opened} 
        onOk={handleSearch} 
        onCancel={() => setFilterPopupOptions({ opened: false })} />
      <FoundationModal opened={foundationPopupOptions.opened}
        onOk={handleSave}
        onCancel={() => setFoundationPopupOptions({ opened: false })} />
    </>
  )
}

export default Foundation