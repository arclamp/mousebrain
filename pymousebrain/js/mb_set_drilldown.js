require(['mousebrain'], function (mb) {
  var uuid = '%s';
  var comp = window.mousebrain[uuid];

  var vis = comp.vis;
  var drilldown = %d;
  vis.setDrilldown(drilldown);
});
