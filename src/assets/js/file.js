var j2storeURL = "index.html";

(function ($) {
  $.ajaxSetup({
    headers: {
      "X-CSRF-Token": Joomla.getOptions("csrf.token"),
    },
  });
})(jQuery);
jQuery(function ($) {
  $("a[target=ls-scroll]").each(function () {
    var href = this.getAttribute("href"),
      root = "index.html";
    if (href.indexOf(root) === 0)
      this.setAttribute("href", href.substr(root.length));
  });
});
var LS_Meta = {
  v: "6.6.053"
};

jQuery(function ($) {
  var addonId = $("#sppb-addon-1551312762459"),
    prentSectionId = addonId.parent().closest("section");

  if (
    $("#sppb-addon-1551312762459").find(".optintype-popup").length !==
    0 &&
    $("body:not(.layout-edit)").length !== 0
  ) {
    prentSectionId.hide();
  }

  if (
    $("#sppb-addon-1551312762459").find(".optintype-popup").length !==
    0 &&
    $("body:not(.layout-edit)").length !== 0
  ) {
    //var parentSection 	= $("#sppb-addon-1551312762459").parent().closest("section"),
    var addonWidth = addonId.parent().outerWidth(),
      optin_timein = 2000,
      optin_timeout = 10000,
      prentSectionId =
      ".com-sppagebuilder:not(.layout-edit) #" + addonId.attr("id");

    $(window).load(function () {
      setTimeout(function () {
        $.magnificPopup.open({
          items: {
            src: '<div class="sppb-optin-form-popup-wrap" ">' +
              $(addonId)[0].outerHTML +
              "</div>",
            //src: "<div style=\"width:+"addonWidth"+\">" + $(addonId)[0].outerHTML + "</div>"
          },
          type: "inline",
          mainClass: "mfp-fade",
          disableOn: function () {
            return true;
          },
          callbacks: {
            open: function () {
              if (optin_timeout) {
                setTimeout(function () {
                  $("#sppb-addon-1551312762459")
                    .magnificPopup("close");
                }, optin_timeout);
              }
            },
          },
        });
      }, optin_timein);
    }); //window
  }
});

var jQowlImg = false;

function initJQ() {
  if (typeof jQuery == "undefined") {
    if (!jQowlImg) {
      jQowlImg = true;
      document.write(
        "<scr" +
        'ipt type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></scr' +
        "ipt>"
      );
    }
    setTimeout("initJQ()", 500);
  }
}
initJQ();

if (jQuery) jQuery.noConflict();

var jQowlImg = false;

function initJQ() {
  if (typeof jQuery == "undefined") {
    if (!jQowlImg) {
      jQowlImg = true;
      document.write(
        "<scr" +
        'ipt type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></scr' +
        "ipt>"
      );
    }
    setTimeout("initJQ()", 500);
  }
}
initJQ();

if (jQuery) jQuery.noConflict();

template = "realgarden";
