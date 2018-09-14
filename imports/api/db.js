import Collection from './collection';
import yup from 'yup';

// Instantiate Mongo Collections
const db = {
  notes: new Collection('notes'),
};

// Set collection schemas
const notes = db.notes.schema.default = {
  _id: yup.string(),
  title: yup.string(),
  body: yup.string(),
  userId: yup.string(),
  updatedAt: yup.date().default(() => new Date()),
};

db.notes.schema.insert = {
  title: notes.title.default('New Title'),
  body: notes.body.default(''),
  userId: notes.userId.required(),
};

db.notes.schema.update = {
  _id: notes._id.required(),
};

db.notes.schema.upsert = db.notes.schema.update;

db.notes.schema.remove = db.notes.schema.update;


export default db;
