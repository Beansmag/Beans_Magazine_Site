import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';
import blockContent from './blockContent';
import lookbook from './lookbook';
import about from './about';
import backgroundVideo from './backgroundVideo';
import backgroundVideoMobile from './backgroundVideoMobile';
import missionCartInfo from './missionCartInfo';
import LoadingAnimation from './LoadingAnim';
import branding from './branding';
import siteBackgroundColor from './siteBackground';
import checkoutAnimation from './checkoutAnim'
import cartIcon from './cartIcon'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({

  name: 'default',

  types: schemaTypes.concat([
    branding,
    LoadingAnimation,
    lookbook,
    about,
    backgroundVideo,
    backgroundVideoMobile,
    missionCartInfo,
    blockContent,
    siteBackgroundColor,
    checkoutAnimation,
    cartIcon
  ]),
})
