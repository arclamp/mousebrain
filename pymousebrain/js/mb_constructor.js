require(['mousebrain'], function (mb) {
  var el = element.get(0);
  var uuid = '%s';
  var options = JSON.parse('%s');
  var vis = new mb.Mousebrain(el, options);

  window.mousebrain[uuid] = {
    el: el,
    vis: vis
  };
});
