//a function that convert number as 1000,2 to 1.000,20
export const getTopForLabels = (chartLabels: string[], chartData: number[]) => {
  //get the max value of the chartData array
  const max = Math.max(...chartData)
  return chartLabels
    .map((label, index) => {
      //get the index of the max value
      if (chartData[index] === max) {
        return label
      }

      return undefined
    })
    .filter((label) => label !== undefined)
    .join(', ')
}

//a function that remove protocol from url and trailing slash
export const removeProtocol = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '')
}
