import Collection from './collection';
import yup from 'yup';


// Describe collections
const notesFields = {
  _id: yup.string(),
  title: yup.string(),
  body: yup.string(),
  userId: yup.string(),
  updatedAt: yup.date().default(() => new Date()),
};

// Instantiate Mongo Collections
const db = {
  notes: new Collection('notes', notesFields),
};

export default db;
