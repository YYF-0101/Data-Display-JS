randerData(rawdata)
createCateType()


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
    <option selected>All Category</option>
    `

    list = allCate + OptionList
  }
  document.getElementById('categoryTypelist').innerHTML = list
}

function getcategType(param) {
  // let value = e.value
  console.log(param)


  // let data = ''
  // let newdata = ''
  // newdata = data.push(item => item.categoryId == value)
  // console.log(newdata)
}