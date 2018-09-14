import yup from 'yup';
import {Meteor} from "meteor/meteor";

class Schema {
  constructor(schema, schemaName='default') {
    // todo: add constructor from array
    this.tests = {};
    if (schema) {
      this.tests.add(schema, schemaName);
    }
  }

  add(schema, schemaName='default', parent?) {
    if (parent && this.tests[parent]) {
      this.tests[schemaName] = this.tests[parent].shape(schema);
    } else {
      this.tests[schemaName] = yup.object(schema);
    }
  }

  get(schemaName) {
    if (this.tests[schemaName]) {
      return this.tests[schemaName];
    } else {
      return this.tests.default;
    }
  }

  // Shortcut for setters
  set default(schema) { this.add(schema) }
  get default() { return this.get('default') }

  set insert(schema) { this.add(schema, 'insert', 'default') }
  get insert() { return this.get('insert') }

  set update(schema) { this.add(schema, 'update', 'default') }
  get update() { return this.get('update') }

  set upsert(schema) { this.add(schema, 'upsert', 'default') }
  get upsert() { return this.get('upsert') }

  set remove(schema) { this.add(schema, 'remove', 'default') }
  get remove() { return this.get('remove') }

  // Validation
  validateSync(value, schemaName='default', options={stripUnknown: true}) {
    try {
      return this.tests[schemaName].validateSync(value, options)
    } catch (err) {
      throw new Meteor.Error('400', err.message, err.details)
    }
  }

  async validate(value, schemaName='default', options={stripUnknown: true}) {
    try {
      return await this.tests[schemaName].validate(value, options);
    } catch (err) {
      throw new Meteor.Error('400', err.errors, err.details)
    }
  }
}

export default Schema;
