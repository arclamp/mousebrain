require(['mousebrain'], function (mousebrain) {
  element.append('<pre>hello, world</pre>');
  console.log(mousebrain);
}, function (error) {
  element.append('<pre>' + error + '</pre>');
});
