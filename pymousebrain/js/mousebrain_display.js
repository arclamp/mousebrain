require(['mousebrain'], function (mousebrain) {
  console.log('hello');
});

element.append('<p>Hello</p>');
var options = JSON.parse('%s');
if (options.value) {
  element.append('<p>' + options.value + '</p>');
}
