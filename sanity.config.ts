import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './src/sanity/lib/env'
import { schemaTypes } from './src/sanity/schema-types'
import { defaultDocumentNode } from '@/sanity/components/default-document-node'
import CustomNavBar from '@/sanity/structure/custom-nav-bar'
import { RocketIcon } from '@sanity/icons'
import CustomToolMenu from '@/sanity/structure/custom-tool-menu'
import { structure } from '@/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ defaultDocumentNode, structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  icon: RocketIcon,
  studio: {
    components: {
      navbar: CustomNavBar,
      toolMenu: CustomToolMenu
    }
  },
  title: 'Lago Travel Studio',
  name: 'lago-travel-studio'
})