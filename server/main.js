import './../imports/startup/server/index';

import Schema from '../imports/api/schema';
import yup from 'yup';




const s = {
  a: yup.string(),
  b: yup.number(),
};

const sc = new Schema();

sc.default =s;

// console.log(sc);
// console.log(sc.default);

sc.validate({a: 12, b: 13}, 'default', {strict: true})
  .then(value => console.log('async', value))
  .catch(err => {console.log(err)});


console.log('test');
console.log('sync', sc.validateSync({a: 12, b: 13}));
