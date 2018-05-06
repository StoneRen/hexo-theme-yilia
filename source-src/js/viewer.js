import PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoSwipe/dist/photoswipe-ui-default";
import "photoSwipe/dist/default-skin/default-skin.css";
import "photoSwipe/dist/photoswipe.css";

window.PhotoSwipe = PhotoSwipe;
window.PhotoSwipeUI_Default = PhotoSwipeUI_Default;

function init() {
  let pswpElement = document.querySelectorAll(".pswp")[0];
  let $imgArr = document.querySelectorAll(
    ".article-entry img:not(.reward-img)"
  );

  $imgArr.forEach(($em, i) => {
    $em.onclick = () => {
      // slider展开状态
      // todo: 这样不好，后面改成状态
      if (document.querySelector(".left-col.show")) return;
      let items = [];
      $imgArr.forEach(($em2, i2) => {
        let img = $em2.getAttribute("data-idx", i2);
        let src = $em2.getAttribute("data-target") || $em2.getAttribute("src");
        let title = $em2.getAttribute("alt");
        items.push({
          src: src,
          w: -1,
          h: -1,
          loaded2: false,
          title: title
        });
      });
      var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, {
        index: parseInt(i)
      });
      /**/
      gallery.listen("imageLoadComplete", function(index, item) {
        // index - index of a slide that was loaded
        // item - slide object
        if (!item.loaded2) {
          var img = new Image();
          img.onload = function() {
            item.w = this.width;
            item.h = this.height;
            try {
              item.loaded2 = true;
              gallery.invalidateCurrItems();
              gallery.updateSize(true);
            } catch (error) {
              //console.log(error);
            }
          };
          img.src = item.src;
        }
      });
      /**/
      gallery.init();
    };
  });
}

module.exports = {
  init: init
};
