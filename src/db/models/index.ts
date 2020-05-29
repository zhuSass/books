import { appSchema, tableSchema } from '@nozbe/watermelondb';

import Post from './post';
import Comment from './comment';

export const schema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: Post.table,
      columns: Post.columns,
    }),
    tableSchema({
      name: Comment.table,
      columns: Comment.columns,
    }),
  ],
});
export const models = [
  Post,
  Comment,
];