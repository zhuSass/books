import { appSchema, ColumnSchema, 
  TableSchema, tableSchema,
} from '@nozbe/watermelondb';

import Collect from './book/collect';
import Comment from './book/catalogue';
import Article from './book/article';

export const models = [
  Collect,
  Comment,
  Article,
];
const tables:TableSchema[] = [];
for (let item of models) {
  tables.push(tableSchema({
    name: item.table,
    columns: item.columns,
  }));
}

export const schema = appSchema({
  version: 2,
  tables: tables,
});
