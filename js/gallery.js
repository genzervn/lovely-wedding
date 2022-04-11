class GalleryType {
  static Prewedding = new GalleryType("prewedding", "Pre-wedding", 49);
  static MassesAndRites = new GalleryType(
    "massed-and-rites",
    "Thánh lễ & nghi thức",
    0
  );
  static GroomParty = new GalleryType("groom-party", "Tiệc nhà trai", 0);
  static BrideParty = new GalleryType("bride-party", "Tiệc nhà gái", 0);

  constructor(name, displayName, numberOfImages) {
    this.name = name;
    this.numberOfImages = numberOfImages;
    this.displayName = displayName;
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

  var setupGalleryDescription = function () {
    document.getElementById("gallery-description").innerHTML =
      getGalleryType().displayName;
  };

  var setupGalleryImage = function () {
    var imagePath = "imagePath";
    var storageImgUrl =
      "https://firebasestorage.googleapis.com/v0/b/save-the-date-website.appspot.com/o/imagePath?alt=media";
    let galleryType = getGalleryType();
    for (let i = 0; i < galleryType.numberOfImages; i++) {
      let imageUrl = storageImgUrl.replace(
        imagePath,
        `${galleryType.name}-images%2F${i + 1}.jpg`
      );
      const aTag = document.createElement("a");
      aTag.className = "image-popup";
      aTag.href = imageUrl;
      const img = document.createElement("img");
      img.src = imageUrl;
      img.loading = "lazy";
      aTag.appendChild(img);
      document.getElementById("gallery-content").appendChild(aTag);
    }
  };

  $(function () {
    setupGalleryDescription();
    setupGalleryImage();
  });
})();
