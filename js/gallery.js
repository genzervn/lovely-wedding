class GalleryType {
  static Prewedding = new GalleryType("prewedding", "Pre-wedding", 49, 'jpg');
  // static MassesAndRites = new GalleryType(
  //   "massed-and-rites",
  //   "TODO LATER Nghi thức",
  //   306,
  //   'jpeg'
  // );
  static GroomParty = new GalleryType("groom-party", "Tiệc nhà trai", 224,'jpeg');
  static BrideParty = new GalleryType("bride-party", "Tiệc nhà gái", 153,'jpeg');

  constructor(name, displayName, numberOfImages, fileType) {
    this.name = name;
    this.numberOfImages = numberOfImages;
    this.displayName = displayName;
    this.fileType = fileType;
  }
}

(function () {
  "use strict";

  var getGalleryType = function () {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var type = url.searchParams.get("type");
    switch (type) {
      case GalleryType.Prewedding.name:
        return GalleryType.Prewedding;
      case GalleryType.MassesAndRites.name:
        return GalleryType.MassesAndRites;
      case GalleryType.GroomParty.name:
        return GalleryType.GroomParty;
      case GalleryType.BrideParty.name:
        return GalleryType.BrideParty;
      default:
        return GalleryType.Prewedding;
    }
  };

  var getImageUrl = function (galleryType, isThumb, imageIndex) {
    const imagePath = "imagePath";
    var storageImgUrl =
      "https:todolatergoogleapis.com/v0/b/save-the-date-website.appspot.com/o/imagePath?alt=media";
    return storageImgUrl.replace(
      imagePath,
      `${galleryType.name}-images%2F${
        isThumb ? "thumb%2F" : ""
      }${imageIndex}.${galleryType.fileType}`
    );
  };

  var setupGalleryDescription = function () {
    document.getElementById("gallery-description").innerHTML =
      getGalleryType().displayName;
  };

  var setupGalleryImage = function () {
    let galleryType = getGalleryType();
    for (let i = 0; i < galleryType.numberOfImages; i++) {
      let imageUrl = getImageUrl(galleryType, false, i + 1);
      let thumbImageUrl = getImageUrl(galleryType, true, i + 1);
      const aTag = document.createElement("a");
      aTag.className = "image-popup";
      aTag.href = imageUrl;
      const img = document.createElement("img");
      img.className = "lozad";
      img.dataset.src = thumbImageUrl;
      aTag.appendChild(img);
      document.getElementById("gallery-content").appendChild(aTag);
    }
    const observer = lozad();
    observer.observe();
  };

  $(function () {
    setupGalleryDescription();
    setupGalleryImage();
  });
})();
