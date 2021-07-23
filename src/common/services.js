import axios from "axios"

const ServerUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000'
const UseMockData = true
const Method = {
  POST: 'post',
  GET: 'get',
}

const getRequest = (path, data, method) => {
  axios.request({
    url: `${ServerUrl}/${path}`,
    method: method,
    params: data,
    timeout: 10000,
    responseType: 'json',
    responseEncoding: 'utf-8'
  })
}

export const getFoundationList = async (keyword) => {
  const mock = [
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
  ]
  
  const res = !UseMockData ? await getRequest('get_foundation_list', { keyword: keyword }, Method.GET) : mock
  
  return res
}

export const saveFoundationData = async (data) => {
  const res = !UseMockData ? await getRequest('save_foundation', data, Method.POST) : { success: true }
  return res
}

export const deleteFoundationData = async (id) => {
  const res = !UseMockData ? await getRequest('save_foundation', {id: id}, Method.POST) : { success: true }
  return res
}

export const getNonprofitList = async (keyword) => {
  const mock = [
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
  
  const res = !UseMockData ? await getRequest('get_nonprofit_list', { keyword: keyword }, Method.GET) : mock
  
  return res
}

export const saveNonprofitData = async (data) => {
  const res = !UseMockData ? await getRequest('save_nonprofit', data, Method.POST) : { success: true }
  return res
}

export const deleteNonprofitData = async (id) => {
  const res = !UseMockData ? await getRequest('save_nonprofit', {id: id}, Method.POST) : { success: true }
  return res
}

export const getHistoryList = async (keyword) => {
  const mock = [
    { id: 1, from: 'cupcake@gmail.com', to: 'donut@hotmail.com' },
    { id: 2, from: 'gingerbread@gmail.com', to: 'jelly@gmail.com' },
    { id: 3, from: 'gingerbread@gmail.com', to: 'marshmallow@hotmail.com' },
    { id: 4, from: 'lollipop@yahoo.com', to: 'cream@hotmail.com' },
    { id: 5, from: 'gingerbread@gmail.com', to: 'jelly@gmail.com' }
  ]
  
  const res = !UseMockData ? await getRequest('get_history_list', { keyword: keyword }, Method.GET) : mock
  
  return res
}

