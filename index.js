let state = []
let priceRangeState = []
currentPage = 1
postsPerPage = 8


// let cateState = []
// let priceRangeState = []

onInit()

function onInit() {
  createCateType()
  const webUrl = window.location.search.substring(1)
  console.log(window.location.search.substring(1))
   webUrl ? urlHandler(webUrl) : reset(rawdata)
}

function urlHandler (params) {
  searchParams = new URLSearchParams(params)
  const urlCateId = searchParams.get ("category") ? searchParams.get ("category") : null
  const urlPriceRange = searchParams.get ("priceRange") ? searchParams.get ("priceRange") : null
  const urlSort = searchParams.get ("sort") ? searchParams.get ("sort") : null
  urlCateId && (
    urlRander('category',urlCateId)
  )
  urlPriceRange && (
    urlRander('priceRange',urlPriceRange)
  )
  urlSort && (
    urlRander('sort',urlSort)
  )
}

function createCateType() {
  let OptionList = ''
  let list = ''
  for (let product of rawdata) {
      if(product.prodType.typeName == "Hire") {
        productCategory = product.prodType.productCategory
      }
  }
  for (const categoryTyprName of productCategory) {
    const categoryId = categoryTyprName.categoryId
    const categoryName = categoryTyprName.categoryName
    const categoryOptionList = `
      <option value="${categoryId}">${categoryName}</option>
    `
    OptionList += categoryOptionList
    const allCate = `
    <option value="0">All Category</option>
    `

    list = allCate + OptionList
  }
  document.getElementById('categoryTypelist').innerHTML = list
}

function randerData(data) {
  let randerTemplate = '' 
  for(let product of data) {
    if(product.productMedia?.[0]) {
      title = product.title
      price = product.price
      id = product.prodId
      urlparam = `./detail.html?prodId=${id}`
      productUrl = `https://storage.googleapis.com/luxe_media/wwwroot/${product.productMedia[0].url}`
      const viewTemplate = `
      <div class="col-md-6 col-lg-4 col-xl-3 mgTop30">
          <a href="${urlparam}" class="img-Link">
            <div class="index-img-box">
              <img src="${productUrl}" alt="" class="img-size">
            </div>
            <div class="cardText mgTop30 row align-items-center">
              <div class="col-10" >
                ${title}
              </div>
              <div class="col-2 price-txt">
                $${price}
              </div>
            </div>
          </a>
        </div>
      `
      randerTemplate += viewTemplate
    }
  }
  document.getElementById('category').innerHTML = randerTemplate
}

function handler(key,value) {
  if (key === 'category') {
    const cateId = value
    categoryFilter(cateId)
    setUrlSearchParam(key,value)
  }
  if (key === 'priceRange') {
    const priceRangeValue = value
    priceRangeFilter(value)
    setUrlSearchParam(key,value)
  }
  if (key === 'sort') {
    console.log(key + value)
    if (value === 'Ascending') {
      console.log(key + value)
      ascending(value)
      setUrlSearchParam(key,value)
    }
    if (value === 'Decending') {
      console.log(key + value)
      decending(value)
      setUrlSearchParam(key,value)
    }
  }
  if (key === 'reset') {
    reset()
    delUrlSearchParam(key, value)
  }
  
}

function categoryFilter(cateId) {
  state = []
  priceRangeState = []
  document.getElementById('price').value = 0
  for (const data of rawdata) {
    if (data.categoryId === parseInt(cateId) || cateId == 0) {
      state.push(data)
    }
  }
  randerPagination(state)
}

function priceRangeFilter(priceRange) {
  priceRangeState = []
  state.length ? datas = state : datas = rawdata
  for (const data of datas) {
    if (priceRange == 0) {
      priceRangeState = datas
    }
    if (priceRange == 100 && data.price > 0 && data.price < 100 ) {        
      priceRangeState.push(data)
    }
    if (priceRange == 500 && data.price > 101 && data.price < 500 ) {        
      priceRangeState.push(data)
    }
    if (priceRange == 1000 && data.price > 501 && data.price < 1000 ) {        
      priceRangeState.push(data)
    }
    if (priceRange == 1001 && data.price > 1000 ) {        
      priceRangeState.push(data)
    }
  }
  randerPagination(priceRangeState)
}

// function filter() {
//   const cateArr = cateState
//   const priceArr = priceRangeState
//   if (cateArr.length ) {
//     state = cateArr
//   }
//   if (priceArr.length ) {
//     state = priceArr
//   }
//   if (cateState.length && priceRangeState.length) {
//     state =  Array.isArray(cateArr) ? cateArr.filter(item => priceArr.indexOf(item) != -1) : []
//     console.log(state)
//   }
//   state &&(
//     spliteData(state),
//     randerData(state)
//   )
// }

function ascending(value) {
  if (value === 'Ascending' && priceRangeState != '') {
        resultSortByA = priceRangeState.sort(function (a,b) {
          return a.price - b.price
        })
      } else {
        resultSortByA = state.sort(function (a,b) {
          return a.price - b.price
        })
      }
  document.getElementById('ascendClick').setAttribute("disabled","")
  document.getElementById('decendClick').removeAttribute("disabled","")
  randerPagination(resultSortByA)
}

function decending(value) {
  if (value === 'Decending' && priceRangeState != '') {
        resultSortByD = priceRangeState.sort(function (a,b) {
          return b.price - a.price
        })
      } else {
        resultSortByD = state.sort(function (a,b) {
          return b.price - a.price
        })
      }
  document.getElementById('decendClick').setAttribute("disabled","")
  document.getElementById('ascendClick').removeAttribute("disabled","")
  randerPagination(resultSortByD)
}

function reset() {
  state = []
  state = rawdata.sort(function (a,b) {
    return a.prodId - b.prodId
  })
  randerPagination(state)
}

function setUrlSearchParam(key,value) {
  const url = new URL(window.location.href)
  url.searchParams.set(key, value)
  window.history.pushState({ path: url.href }, '', url.href)
}

function delUrlSearchParam() {
  const url = new URL(window.location.href)
  url.searchParams.delete('category')
  url.searchParams.delete('priceRange')
  url.searchParams.delete('sort')
  window.history.pushState({ path: url.href }, '', url.href)
  document.getElementById('categoryTypelist').value = 0
  document.getElementById('price').value = 0
  document.getElementById('ascendClick').removeAttribute("disabled","")
  document.getElementById('decendClick').removeAttribute("disabled","")
}

function urlRander(key,value) {
  if (key === 'category') {
    const cateId = value
    categoryFilter(cateId)
    document.getElementById('categoryTypelist').value = cateId
  }
  if (key === 'priceRange') {
    const priceRangeValue = value
    priceRangeFilter(value)
    document.getElementById('price').value = priceRangeValue
  }
  if (key === 'sort') {
    console.log(key + value)
    if (value === 'Ascending') {
      console.log(key + value)
      ascending(value)
      document.getElementById('ascendClick').setAttribute("disabled","")
    }
    if (value === 'Decending') {
      console.log(key + value)
      decending(value)
      document.getElementById('decendClick').setAttribute("disabled","")
    }
  }
}



function randerPagination (params) {
  const pageNumbers = []
  let pageTemplate = ''
  pageLength =  Math.ceil(params.length / postsPerPage)
  for (let number = 0; number < pageLength; number++) {
      pageNumbers.push(number)
  }
  for (let number = 0; number < pageNumbers.length; number++) {
    const Template = `
    <li onclick = "setPageNumber(value)" value = ${number} className = "page-item">
    <a   class = "page-link"> ${number + 1 }</a>
    </li>
    `
    pageTemplate += Template
  }
  document.getElementById("page").innerHTML = pageTemplate
  setPageNumber(0)
  setCurrentPost(params)
}

function setPageNumber(value) {
  currentPage = value + 1
  if (priceRangeState.length === 0) {
    setCurrentPost (state)
  } else {
    setCurrentPost (priceRangeState)
    console.log(priceRangeState)
  }
}

function setCurrentPost (params) {
  const newstate = []
  for(let product of params) {
    if(product.productMedia?.[0]) {
      newstate.push(product)
    }
}
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = newstate.slice(indexOfFirstPost, indexOfLastPost)
  randerData(currentPosts)
  console.log(currentPosts)
}
