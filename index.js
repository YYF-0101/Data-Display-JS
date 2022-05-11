createCateType()
// spliteData(rawdata)
randerData(rawdata)
// randerPagination(rawdata)
// eventListener()


let cateType = ''
let priceMin = 0
let priceMax = 500000

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
    if(product.productMedia[0]) {
      title = product.title
      price = product.price
      id = product.prodId
      urlparam = `./detail.html?prodId=${id}`
      productUrl = `https://storage.googleapis.com/luxe_media/wwwroot/${product.productMedia[0].url}`
      const viewTemplate = `
      <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 mgTop30">
          <a href="${urlparam}" class="img-Link">
            <div class="img-box">
              <img src="${productUrl}" alt="" class="img-size">
            </div>
            <div class="mgTop30 row align-items-center">
              <div class="col" >
                ${title}
              </div>
              <div class="col price-txt">
                ${price}
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

  let tempFilter = {};
  for (key in filter) {
    if (typeof(filter[key]) != "undefined" && typeof(filter[key] != "null" && filter[key] != null && filter[key] != '')) {
      tempFilter[key] = filter[key];
    }
  }

  let resultArr = rawdata.filter(
    (item) => {
      let flag = false
      for (let key in tempFilter) {
        if (item.categoryId) {
          if (item[key].toString().split(",").indexOf(cateType.toString()) >= 0  && item.price > priceMin && item.price < priceMax) {
            flag = true
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

  console.log(resultArr)
  randerData(resultArr)
}


function randerPagination(data) {
  let currPage = 1
  let pageIndex = 0
  let pagesize = 9
  let randerPage = ''
  if (!data.productMedia) {
    var pageNumbers= Math.ceil(data.length/pagesize)
  }
  console.log(pageNumbers)

  while (pageIndex < pageNumbers) {
    pageIndex ++
    const pageIndexTemplate = `
    <li class="page-item"><a class="page-link" href="#">${pageIndex}</a></li>
  `
    randerPage += pageIndexTemplate
  }
  document.getElementById('page').innerHTML = randerPage
}

function spliteData (data) {
  let pagesize = 9 
  return result = Array
    .from(Array(Math.ceil(data.length / pagesize)))
    .map((_, i) => data.slice(i * pagesize, (i + 1) * pagesize));
}

function eventListener() { 
  document.getElementById("previous").addEventListener("click", previous);
  document.getElementById("next").addEventListener("click", next);
}

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