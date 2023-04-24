import axios from 'axios'

const handleInsertDataApi = (body) => {
    return axios.post('/insert-mssql', body, { withCredentials: true })
}


export {
    handleInsertDataApi
}

