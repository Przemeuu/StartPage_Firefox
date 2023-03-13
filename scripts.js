/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"ugtm8Mkr1rJbVFph","label":"Developer","bookmarks":[{"id":"FdeQx0UwpLuFl2Oj","label":"GitHub","url":"https://github.com/"},{"id":"RG0PK5aOYp7YnA7M","label":"127.0.0.1","url":"127.0.0.1"},{"id":"1MAX32uYJkpj8YsW","label":"Stack Overflow","url":"https://stackoverflow.com/"}]},{"id":"UUY6ccBUlEw9p5oe","label":"Doc","bookmarks":[{"id":"PMCUCXSPnxN5iEaT","label":"I3wm","url":"https://i3wm.org/docs/userguide.html"},{"id":"zMIzzeQiIW5JFHHK","label":"UnixPorn","url":"https://www.reddit.com/r/unixporn/"}]},{"id":"lNUOtg7GPszehHB0","label":"Apps","bookmarks":[{"id":"sv7Jx0EqcqqiK8Uy","label":"YouTube","url":"https://www.youtube.com/"},{"id":"ro1svN3PXPKoHDun","label":"gg.deals","url":"https://gg.deals/"},{"id":"fkNYqZ7gH7yBAMcQ","label":"Alternative To","url":"https://alternativeto.net/"}]},{"id":"cpuov0sSzxBIthRr","label":"Other","bookmarks":[{"id":"s2ccgtGKa7wn5bbl","label":"Twitch","url":"https://www.twitch.tv/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
