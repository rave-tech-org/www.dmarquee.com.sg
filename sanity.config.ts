import { defaultDocumentNode } from '@/sanity/components/default-document-node';
import { structure } from '@/sanity/structure';
import CustomNavBar from '@/sanity/structure/custom-nav-bar';
import CustomToolMenu from '@/sanity/structure/custom-tool-menu';
import { DashboardIcon } from '@sanity/icons';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { apiVersion, dataset, projectId } from './src/sanity/lib/env';
import { schemaTypes } from './src/sanity/schema-types';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool({ defaultDocumentNode, structure }), visionTool({ defaultApiVersion: apiVersion })],
  icon: DashboardIcon,
  studio: {
    components: {
      navbar: CustomNavBar,
      toolMenu: CustomToolMenu,
    },
  },
  title: 'D’Marquee Studio',
  name: 'lago-travel-studio',
});
