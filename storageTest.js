var q = require('./storage');

q.createQueue('foo');
q.enQueue('foo','Pokemon');
q.enQueue('foo','black');

q.createQueue('bar',2);
q.enQueue('bar','Moon');
q.enQueue('bar','dog');
q.enQueue('bar','cat');

console.log('Getting items...');
var item = q.deQueue('foo');
var item2 = q.deQueue('bar');
console.log(item,item2);

console.log('Remaining items...');
q.listQueue('foo');
q.listQueue('bar');

console.log('Getting items...');
var item = q.deQueue('foo');
var item2 = q.deQueue('bar');
console.log(item,item2);

console.log('Remaining items...');
q.listQueue('foo');
q.listQueue('bar');

var check = q.deQueue('bar');
console.log(check);

if (check) { console.log('checked')}














