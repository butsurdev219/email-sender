import TableToolbar from "../../components/TableToolbar"
import TableHeader from "../../components/TableHeader"
import FilterModal from "../../modals/FilterModal"
import ComposeModal from "../../modals/ComposeModal"

import { useState, useEffect } from "react"
import { Grid, Card, Typography, 
  TableContainer, Table, TableBody, TableCell, Checkbox, TableRow, 
  Paper, TablePagination } from "@mui/material"
import { HistoryWrapper} from "./styled"
import { toast } from "react-toastify"
import { Message, PerPageCountList } from "../../common/constants"
import { getHistoryList } from "../../common/services"


const History = () => {
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [selected, setSelected] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filterPopupOptions, setFilterPopupOptions] = useState({ opened: false })
  const [composePopupOptions, setComposePopupOptions] = useState({ opened: false })

  const [historyList, setHistoryList] = useState([])
  let inited = false
  const getHistoryData = (keyword) => {
    getHistoryList('').then(res => {
      if (!res) {
        toast.error(Message.SERVER_ERROR)
        return
      }

      setHistoryList(res)
    })
  }

  useEffect(() => {
    if (inited) {
      return
    }

    inited = true

    getHistoryData('')
  }, [])

  const headCells = [
    {
      id: 'from',
      numeric: false,
      disablePadding: true,
      label: 'From (Foundation)',
    },
    {
      id: 'to',
      numeric: false,
      disablePadding: false,
      label: 'To (Nonprofit)',
    },
  ]

  const isSelected = (id) => selected.indexOf(id) !== -1

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = historyList.map((n) => n.id);
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

  const showComposePopup = () => {
    setComposePopupOptions({ opened: true })
  }

  const handleSearch = (keyword) => {

  }

  const handleSend = (data) => {

  }

  return (
    <>
      <HistoryWrapper>
        <Typography variant="h6" nowrap component="div">History</Typography>
        <Grid contianer 
          sx={{ pt: 2 }}>
          <Card sx={{ p: 2 }}>
            <TableToolbar 
              numSelected={selected.length}
              onAddClick={showComposePopup}
              onFilterClick={showFilterPopup} />
            <Paper>
              <TableContainer>
                <Table>
                  <TableHeader 
                    headCells={headCells}
                    numSelected={selected.length}
                    rowCount={historyList.length}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                  { historyList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `row-${index}`;
                    return (
                      <TableRow
                          hover
                          onClick={(e) => handleClicked(e, row.id)}
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
                            {row.from}
                          </TableCell>
                          <TableCell align="center">{row.to}</TableCell>
                        </TableRow>
                    )
                  }) }
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={PerPageCountList}
                component="div"
                count={historyList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Card>
        </Grid>
      </HistoryWrapper>
      <FilterModal opened={filterPopupOptions.opened}
        onOk={handleSearch}
        onCancel={() => setFilterPopupOptions({ opened: false })} />
      <ComposeModal opened={composePopupOptions.opened}
        onOk={handleSend}
        onCancel={() => setComposePopupOptions({ opened: false })}/>
    </>
  )
}

export default History