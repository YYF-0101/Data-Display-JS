 
// spliteData(rawdata)
randerData(rawdata)
// randerPagination(rawdata)
// eventListener()

let state = []

onInit()

function onInit() {
  createCateType()
  const webUrl = window.location.search.substring(1)
  console.log(webUrl)
}


let cateType = ''
let priceMin = 0
let priceMax = 500000

let resultArr = ''

function createCateType() {
  let OptionList = ''
  let list = ''
  for (let product of rawdata) {
      if(product.prodType.typeName == "Hire") {
        const productCategories = product.prodType.productCategory
        productCategory = productCategories
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
    <option selected value="0">All Category</option>
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

function handlerCateType(params) {
  cateType = parseInt(params.value)
  filter()
}

function handlerPrice(params) {

  switch (params.value) {
      case "0":
      priceMin = 0
      priceMax = 50000
      console.log(priceMax)
      break;
    
      case "100":
      priceMin = 0
      priceMax = 100
      console.log(priceMax)
      break;

      case "500":
      priceMin = 101
      priceMax = 500
      console.log(priceMax)
      break;

      case "1000":
      priceMin = 501
      priceMax = 1000
      console.log(priceMax)
      break;

      case "1001":
      priceMin = 1001 
      priceMax = 50000
      console.log(priceMax)
      break;
  
    default:
      break;
  }
  filter()
}

function filter() {
  let filter = {
    "categoryId": cateType,
  }

  // let tempFilter = {};
  // for (key in filter) {
  //   if (typeof(filter[key]) != "undefined" && typeof(filter[key] != "null" && filter[key] != null && filter[key] != '')) {
  //     tempFilter[key] = filter[key];
  //   }
  // }

  resultArr = rawdata.filter(
    (item) => {
      let flag = false
      for (let key in filter) {
        if (item.categoryId && item.productMedia[0]) {
          if (item[key].toString().split(",").indexOf(cateType.toString()) >= 0  && item.price >= priceMin && item.price <= priceMax) {
            flag = true
          }else if (!cateType) {
            if (item.price >= priceMin && item.price <= priceMax) {
              flag = true
            }
          }else {
            flag = false
            break
          }
        }
      }
      if(flag) {
        return item
      }
    }
  )
  pager(resultArr)
}

let ascendbtn = document.getElementById('ascendClick')
ascendbtn.addEventListener("click",sortByAscend)
let decendbtn = document.getElementById('decendClick')
decendbtn.addEventListener("click",sortByDecend)
let resetbtn = document.getElementById('resetClick')
resetbtn.addEventListener("click",reset)

function sortByAscend() {
  ascendbtn.classList.add("disabled")
  decendbtn.classList.remove("disabled")
  if (resultArr) {
    resultSortByA = resultArr.sort(function (a,b) {
      return a.price - b.price
    })
  } else {
    resultSortByA = rawdata.sort(function (a,b) {
      return a.price - b.price
    })
  }
  console.log(resultSortByA)
  randerData(resultSortByA)
}
function sortByDecend() {
  decendbtn.classList.add("disabled")
  ascendbtn.classList.remove("disabled")
  if (resultArr) {
    resultSortByD = resultArr.sort(function (a,b) {
      return b.price - a.price
    })
  } else {
    resultSortByD = rawdata.sort(function (a,b) {
      return b.price - a.price
    })
  }
  console.log(resultSortByD)
  randerData(resultSortByD)
}
function reset() {
  ascendbtn.classList.remove("disabled")
  decendbtn.classList.remove("disabled")
  if (resultArr) {
    resultReset = resultArr.sort(function (a,b) {
      return a.prodId - b.prodId
    })
  } else {
    resultReset = rawdata.sort(function (a,b) {
      return a.prodId - b.prodId
    })
  }
  console.log(resultReset)
  randerData(resultReset)
}


  // document.getElementById("previous").addEventListener("click", previous);
  // document.getElementById("next").addEventListener("click", next);
  // let obutton = document.getElementById("page").getElementsByTagName("li")
  // obutton.addEventListener("click",currentPage)
  // console.log(obutton)

function previous() {
  console.log("im previous")
}

function next() {
  console.log("im next")
}

// function init(){
//   document.getElementById("next").onclick = function() { 
//     pager("next");
//     return false;
//   };
//   document.getElementById("previous").onclick = function() { 
//     pager("previous"); 
//     return false;
//   };
// }

function pager() {
  let pageSize = 8
  let pageIndex = 0
  let randerPage = ''
  let currentPage = 0
  
  var pageNumbers= Math.ceil(resultArr.length/pageSize)

  console.log(pageNumbers)

  while (pageIndex < pageNumbers) {
    pageIndex ++
    const pageIndexTemplate = `
    <li class="page-item"><a class="page-link" href="#">${pageIndex}</a></li>
  `
    randerPage += pageIndexTemplate
  }

  document.getElementById('page').innerHTML = randerPage
  resultArr = Array
    .from(Array(Math.ceil(resultArr.length / pageSize)))
    .map((_, i) => resultArr.slice(i * pageSize, (i + 1) * pageSize));
  
    console.log(resultArr)
  let ArrNumber = resultArr.length



  if (ArrNumber == pageNumbers) {
    console.log(resultArr)
    randerData(resultArr?.[0])
    // resultArr =resultArr[currentPage]
  }
}

// function pager(action, page) {
//   switch (action) {
//     case "next":
//       if( (page + 1) < pageNumbers ){ 
//         ++page;
//         console.log(page)
//       }
//       console.log(page)
//       break;
     
//     case "previous":
//       if( (page - 1) >= 1 ){
//          --page;
//       }
//       break;

//     default:
//       break;
//   }
// }