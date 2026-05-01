import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure'; 
import { visionTool } from '@sanity/vision';
// Pastikan ada '/' setelah titik agar merujuk ke folder sanity/schemas
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'Farhan Aqiqah Studio',

  // Project ID sudah sesuai dengan dashboard Anda
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'nr91ekf5',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',

  plugins: [
    structureTool(), 
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
});