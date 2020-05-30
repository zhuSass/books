import { appSchema, tableSchema } from '@nozbe/watermelondb';

import CollectBooks from './collectBooks';
import Comment from './comment';

export const schema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: CollectBooks.table,
      columns: CollectBooks.columns,
    }),
    tableSchema({
      name: Comment.table,
      columns: Comment.columns,
    }),
  ],
});
export const models = [
  CollectBooks,
  Comment,
];