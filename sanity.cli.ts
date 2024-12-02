import { defineCliConfig } from 'sanity/cli'
import * as dotenv from 'dotenv'
import { dataset, projectId } from '@/sanity/lib/env'
dotenv.config()

export default defineCliConfig({
  api: { projectId, dataset },
})