import { SchemaTypeDefinition } from 'sanity';

// Import all schemas here
import destination from './destination';
import packageSchema from './package';
import blog from './blog';
import faq from './faq';

export const schemaTypes: SchemaTypeDefinition[] = [
  destination,
  packageSchema,
  blog,
  faq,
];

