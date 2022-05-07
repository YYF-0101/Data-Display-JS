randerDetailData()

function randerDetailData() {
  // get id from url
  const url = new URL(window.location)
  var params = new URLSearchParams(url.search.substring(1))
  let getId = parseInt(params.get("prodId"), 10)

  //
  var selectData = rawdata.find(item => item.prodId == getId)
  // console.log(getId)
  // console.log(index)
  title = selectData.title
  price = selectData.price
  descrip = selectData.description
  imgUrl = `https://storage.googleapis.com/luxe_media/wwwroot/${selectData.productMedia[0].url}`
  const detailTemplate = `
  <div class="detailTitle mgTop30">
  ${title}
  </div>

  <hr />

  <div class="row">
    <div class="img-box col">
      <img src="${imgUrl}" alt="" class="img-size">
    </div>
    <div class="col">
      <div>
        ${descrip}
      </div>
      <div class="price-txt mgTop30">
        $${price}
      </div>
    </div>
  </div>
  <input class="returnBt mgTop30" name="action" onclick="history.back()" type="submit" value="OK"/>
      `
  document.getElementById('detail').innerHTML = detailTemplate
}