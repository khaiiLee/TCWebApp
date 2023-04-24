const axios = require('axios')
let getData = async()=>{
  
  return await axios.get('http://localhost:8090/mssql', {
    params: {
      query: `select * from [dbo].[app_f_sale]`,
      token: 123456
    },
    headers: { 'Content-Type': 'application/json' }
  })}
let datax = getData()
export const data = getData()