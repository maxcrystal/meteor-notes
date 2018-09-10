import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';


const db = {};

db.addCollection = (name, options?) => {
  if (typeof(name) === 'string' && name.length > 0 && Object.keys(this).indexOf(name) === -1) {
    db[name] = new Collection(name, options);
    return db[name];
  } else {
    throw new Error('invalid collection name');
  }
};

db.validate = (value, schema, options?) => {
  if (typeof(value) === 'object' && typeof(schema) === 'object') {
    try {
      return schema.validateSync(value, options)
    } catch (err) {
      throw new Meteor.Error('400', err.message, err.details)
    }
  } else {
    throw new Error('value and schema should be valid objects');
  }
};

class Collection extends Mongo.Collection {
  constructor(name, options?) {
    super(name, options);
    this.schema = undefined;
  }

  setSchema(schema) {
    if (typeof(schema) === 'object') {
      this.schema = schema;
    } else {
      throw new Error('schema should be an object');
    }
  }

  schema() {
    return this.schema;
  }

  validate(value, options?) {
    return db.validate(value, this.schema, options);
  }
}

export default db;
