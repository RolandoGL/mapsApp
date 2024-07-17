
const { writeFileSync, mkdirSync, write} = require('fs')

require('dotenv').config()

const targetPath = './src/enivironments/environment.ts'

const envFileContent= `
export const environment ={
  mapBox_key: "${ process.env['MAPBOX_KEY']}"
}
`

mkdirSync('./src/enivironments', { recursive: true } )
writeFileSync( targetPath, envFileContent )
