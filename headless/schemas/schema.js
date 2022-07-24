import createSchema from 'part:@sanity/base/schema-creator'

import schemaTypes from 'all:part:@sanity/base/schema-type'

import blockContent from './blockContent'
import lookbook from './lookbook'
import about from './about'
import backgroundVideo from './backgroundVideo'
import backgroundVideoMobile from './backgroundVideoMobile'
import missionCartInfo from './missionCartInfo'
import LoadingAnimation from './LoadingAnim'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    LoadingAnimation,
    lookbook,
    about,
    backgroundVideo,
    backgroundVideoMobile,
    missionCartInfo,
    blockContent,
  ]),
})
