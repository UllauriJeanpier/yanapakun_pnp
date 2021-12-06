import Api from './api'

export const saveCallHelp = async () => {
  return await Api.post('/call-help')
}

export const getCallHelp = async () => {
  return await Api.get('/call-help')
}

export const getOneCallHelp = async (id: number) => {
  return await Api.get(`/call-help/${id}`)
}

export const statusCallHelp = async (id: number, description: string, status: string) => {
  return await Api.patch(`/call-help/status/${id}`, { description, status })
}