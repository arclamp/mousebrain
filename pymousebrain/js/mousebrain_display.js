require(['mousebrain'], function (mb) {
  var options = JSON.parse('%s');
  var vis = new mb.Mousebrain(element.get(0), options);
  vis.render();
});
