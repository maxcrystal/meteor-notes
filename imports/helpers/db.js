import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';


const db = {};

db.addCollection = (name, options?) => {
  if (typeof(name) === 'string' && name.length > 0 && ['addCollection', 'validate'].indexOf(name) === -1) {
    db[name] = new Collection(name, options);
    return db[name];
  } else {
    throw new Error('invalid collection name');
  }
};

db.validate = (value, schema) => {
  if (typeof(value) === 'object' && typeof(schema) === 'object') {
    try {
      return schema.validateSync(value)
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

  validate(value) {
    return db.validate(value, this.schema);
  }
}

export default db;
