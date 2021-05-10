const shortenTags = (tags: Tag[], maxLen: number): Tag[] => {
  let total = 0
  let stopIndex = 0
  tags.forEach((tag: Tag) => {
    total += tag.name.length
    if (total > maxLen) {
      return true
    }
    stopIndex += 1
  })
  return tags.slice(0, stopIndex)
}
export default shortenTags
