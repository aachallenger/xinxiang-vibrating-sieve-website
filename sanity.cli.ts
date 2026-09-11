import {defineCliConfig} from 'sanity/cli'
import settings from './cms-config.json'
export default defineCliConfig({api:{projectId:process.env.SANITY_STUDIO_PROJECT_ID||settings.projectId,dataset:process.env.SANITY_STUDIO_DATASET||settings.dataset}})

