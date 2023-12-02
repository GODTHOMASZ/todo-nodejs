export const dateDifference = (date:  string) => {
    const currentDate = new Date().getDate()
    const taskDateConv = new Date(date).getDate()

    if(currentDate > taskDateConv)
      return true
    return false
}
