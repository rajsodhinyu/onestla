import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {media} from 'sanity-plugin-media'
import {FaStamp} from 'react-icons/fa'

export default defineConfig({
  name: 'default',
  icon: FaStamp,
  title: 'On Est Là',

  projectId: '3r2xt54q',
  dataset: 'production',

  plugins: [structureTool({structure}), media(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    comments: {
      enabled: false,
    },
  },
})
