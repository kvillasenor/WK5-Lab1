import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);

const projectRoot = path.resolve(currentDirectory, '../../');
const configuredDatabasePath = process.env.DATABASE_PATH || './data/tasks.db';

const databasePath = path.isAbsolute(configuredDatabasePath)
  ? configuredDatabasePath
  : path.resolve(projectRoot, configuredDatabasePath);

fs.mkdirSync(path.dirname(databasePath), { recursive: true });

export const db = new Database(databasePath);

db.pragma('foreign_keys = ON');

const schemaPath = path.join(currentDirectory, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

db.exec(schema);
