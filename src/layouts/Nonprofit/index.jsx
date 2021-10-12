import TableToolbar from "../../components/TableToolbar"
import TableHeader from "../../components/TableHeader"
import NonprofitModal from "../../modals/NonprofitModal"
import FilterModal from "../../modals/FilterModal"

import { useState, useEffect } from "react"
import { Grid, Card, Typography, 
  TableContainer, Table, TableBody, TableCell, Checkbox, TableRow, 
  Paper, TablePagination, IconButton } from "@mui/material"
import { Delete as DeleteIcon } from "@mui/icons-material"
import { NonProfitWrapper } from "./styled"
import { Message, PerPageCountList } from "../../common/constants"
import { toast } from "react-toastify"
import { getNonprofitList, saveNonprofitData, deleteNonprofitData } from "../../common/services"

const NonProfit = () => {
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [selected, setSelected] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [filterPopupOptions, setFilterPopupOptions] = useState({ opened: false })
  const [nonprofitPopupOptions, setNonprofitPopupOptions] = useState({ opened: false })

  const [nonprofitList, setNonprofitList] = useState([])

  let inited = false
  const getNonprofitData = (keyword) => {
    getNonprofitList('').then(res => {
      if (!res) {
        toast.error(Message.SERVER_ERROR)
        return
      }

      setNonprofitList(res)
    })
  }

  useEffect(() => {
    if (inited) {
      return
    }

    inited = true

    getNonprofitData('')
  }, [])

  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    {
      id: 'address',
      numeric: false,
      disablePadding: false,
      label: 'Address',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
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
      label: ''
    }
  ]

  const isSelected = (id) => selected.indexOf(id) !== -1

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = nonprofitList.map((n) => n.id);
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
  
  const showNonprofitPopup = () => {
    setNonprofitPopupOptions({ opened: true })
  }

  const handleSearch = (keyword) => {

  }

  const handleSave = (data) => {
    setNonprofitPopupOptions({ opened: false })
    saveNonprofitData(data).then(res => {
      if (!res || !res.success) {
        toast.error(Message.SERVER_ERROR)
        return
      }

      setNonprofitList([{ id: nonprofitList.length, ...data }, ...nonprofitList])
      toast.success(Message.SUCCEED_SAVE_DATA)
    })
  }

  const handleDelete = (e, id) => {
    e.preventDefault()

    deleteNonprofitData(id).then(res => {
      if (!res || !res.success) {
        toast.error(Message.SERVER_ERROR)
        return
      }

      const new_ = nonprofitList.filter(v => v.id !== id)
      setNonprofitList(new_)
      toast.success(Message.SUCCEED_DELETE_DATA)
    })
  }


  return (
    <>
      <NonProfitWrapper>
        <Typography variant="h6" nowrap component="div">Nonprofit</Typography>
        <Grid contianer 
          sx={{ pt: 2 }}>
          <Card sx={{ p: 2 }}>
            <TableToolbar 
              numSelected={selected.length}
              onFilterClick={showFilterPopup}
              onAddClick={showNonprofitPopup} />
            <Paper>
              <TableContainer>
                <Table>
                  <TableHeader 
                    headCells={headCells}
                    numSelected={selected.length}
                    rowCount={nonprofitList.length}
                    onSelectAllClick={handleSelectAllClick} />
                  <TableBody>
                  { nonprofitList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                              onClick={(event) => handleClicked(event, row.id)}
                              color="primary"
                              checked={isItemSelected}
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
                            {row.name}
                          </TableCell>
                          <TableCell align="center">{row.address}</TableCell>
                          <TableCell align="center">{row.email}</TableCell>
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
                count={nonprofitList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Card>
        </Grid>
      </NonProfitWrapper>
      <FilterModal opened={filterPopupOptions.opened}
        onOk={handleSearch}
        onCancel={() => setFilterPopupOptions({ opened: false })}/>
      <NonprofitModal opened={nonprofitPopupOptions.opened}
        onOk={handleSave}
        onCancel={() => setNonprofitPopupOptions({ opened: false })} />
    </>
    
  )
}

export default NonProfit