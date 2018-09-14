import {Mongo} from 'meteor/mongo';

import Schema from './schema';


class Collection extends Mongo.Collection {
  constructor(name, options?) {
    super(name, options);
    this.schema = new Schema();
  }

  validate(value, schema='default', options?) {
    // todo allow pass yup schema along with strings
    const validatedValue = this.schema.validateSync(value, schema, options);

    return validatedValue;
  }
}

export default Collection;
