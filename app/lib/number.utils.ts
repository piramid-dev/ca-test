//a function that convert number as 1000,2 to 1.000,20
export const formatNumber = (
  number: number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
): string => {
  if (number === null || number === undefined) return ''
  //if is not a number return the number
  if (isNaN(number)) return number.toString()

  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(number)
}

export const processingLikeMap = (
  value: number,
  iStart: number,
  iStop: number,
  oStart: number,
  oStop: number,
) => {
  return oStart + (oStop - oStart) * ((value - iStart) / (iStop - iStart))
}

export const calculateWeightedLevel = (
  lB: number,
  lG: number,
  lA: number,
  lH: number,
) => {
  const level = 1 * lB + 2 * lG + 3 * lA + 4 * lH

  const weightedLevel = level / (lB + lG + lA + lH)

  return weightedLevel
}
