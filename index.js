randerData()

function randerData() {
  let randerTemplate = '' 
  for(let product of rawdata) {
    if(product.productMedia[0]) {
      title = product.title
      price = product.price
      productUrl = `https://storage.googleapis.com/luxe_media/wwwroot/${product.productMedia[0].url}`
      const viewTemplate = `
      <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
          <a href="http://" class="img-Link">
            <div class="img-box">
              <img src="${productUrl}" alt="" class="img-size">
            </div>
            <div class="Template-txtBox row align-items-center">
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
  console.log(title)
  document.getElementById('category').innerHTML = randerTemplate
}
