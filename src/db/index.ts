import { AppRegistry, NativeModules } from 'react-native';

import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import {
  models,
  schema,
} from './models';

const adapter = new SQLiteAdapter({
  dbName: 'WatermelonDemo',
  schema: schema,
});

export const database = new Database({
  adapter,
  modelClasses: models,
  actionsEnabled: true,
});
