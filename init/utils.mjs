import path from 'path'
import fs from 'fs'

export const setGlobalData = (data, file_name, folder_path) => {
  if (!file_name) {
    return console.log('Please provide a file name')
  }

  if (!folder_path) {
    folder_path = '/app/json/'
  }

  const folderPath = path.join(process.cwd(), folder_path)
  const filePath = path.join(folderPath + file_name)

  // Check if the folder already exists
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify(data))
    console.log(`!! ${file_name} file written successfully !!`)
  } catch (err) {
    console.log('Error in writing file')
    console.log(err)
  }
}

export const getGlobalData = () => {
  const filePath = path.join(process.cwd(), 'json/global.json')
  const jsonData = fs.readFileSync(filePath)
  const json = JSON.parse(jsonData.toString())
  // Find item based on slug and language
  return json
}

// Truncate phrase after a certain number of words
export const truncatePhrase = (phrase, words) => {
  return phrase.split(' ').splice(0, words).join(' ')
}
