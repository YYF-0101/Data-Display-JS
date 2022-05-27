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
  media = selectData.productMedia
  mediaUrl = ''
  // media.length > 1 ? addPicture(media): mediaUrl = selectData.productMedia[0].url
  // selectData.productMedia[0].url ?   : 
  // imgUrl = `https://storage.googleapis.com/luxe_media/wwwroot/${mediaUrl}`
  const detailTemplate = `
  <div class="detailTitle mgTop30">
  ${title}
  </div>

  <hr />

  <div class="row">
    <div class="detail-img-box col ">
      <div id="morePic" class="row"></div>
    </div>
    <div class="col">
      <div>
        ${descrip}
      </div>
      <div class="price-txt mgTop30">
        $${price}
      </div>
      <input class="returnBt mgTop30" name="action" onclick="history.back()" type="submit" value="OK"/>
    </div>
  </div>
  
      `
  document.getElementById('detail').innerHTML = detailTemplate
  addPicture(media)
}

function addPicture(media){
  if (media.length > 1) {
    for (eachUrl of media) {
      console.log(eachUrl.url)
      imgUrl = `https://storage.googleapis.com/luxe_media/wwwroot/${eachUrl.url}`
      const Template = `
        <img src="${imgUrl}" alt="" class="img-size col-md-12 col-lg-6 mb-1">
      `
      console.log(Template)
      document.getElementById('morePic').innerHTML += Template
    }
  }else{
    imgUrl = `https://storage.googleapis.com/luxe_media/wwwroot/${media[0].url}`
      const Template = `
        <img src="${imgUrl}" alt="" class="img-size detail-img-single">
      `
      console.log(Template)
      document.getElementById('morePic').innerHTML += Template
  }
  
}