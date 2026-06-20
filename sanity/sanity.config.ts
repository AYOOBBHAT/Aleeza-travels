import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { projectId, dataset } from './studioEnv';

export default defineConfig({
  name: 'aleeza-travels',
  title: 'Aleeza Travels CMS',
  
  projectId,
  dataset,
  
  basePath: '/studio',
  
  plugins: [
    structureTool(),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
});

