(function($) {

  var selectionDisabled = {
    "-webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none"
  };
  var selectionEnabled = {
    "-webkit-touch-callout": "",
    "-webkit-user-select": "",
    "-khtml-user-select": "",
    "-moz-user-select": "",
    "-ms-user-select": "",
    "user-select": ""
  };
  $.fn.disableSelection = function (recursive) {
    recursive = recursive || true;
    if (recursive) {
      $(this).css(selectionDisabled);
      if ($(this)[0].nodeType == 1) {
        $(this)[0].setAttribute("unselectable", "on")
      }
      var child = $(this)[0].firstChild
      while (child) {
        $(child).disableSelection(recursive)
        child = child.nextSibling
      }
    } else {
      return this.each(function () {
        $(this).css(selectionDisabled)
          .attr('unselectable', 'on')
          .bind('selectstart', function () {
            return false;
          });
      });

    };
  };
  $.fn.enableSelection = function (recursive) {
    recursive = recursive || true;
    if (recursive) {
      $(this).css(selectionEnabled);
      if ($(this)[0].nodeType == 1) {
        $(this)[0].setAttribute("unselectable", "off")
      }
      var child = $(this)[0].firstChild
      while (child) {
        $(child).enableSelection(recursive)
        child = child.nextSibling
      }
    } else {
      return this.each(function () {
        $(this).css(selectionEnabled).attr('unselectable', 'off').unbind('selectstart');
      });
    }
  };

})(jQuery);
