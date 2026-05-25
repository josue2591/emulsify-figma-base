import typeFaces from './type-faces.twig';
import headingStyles from './heading-styles.twig';
import bodyStyles from './body-styles.twig';

import typeFacesData from './type-faces.yml';
import headingStyleData from './heading-styles.yml';
import bodyStyleData from './body-styles.yml';

export default { title: 'Base/Typography' };

export const TypeFaces = () =>
  `<div class="cl-container"><div class="layer-wrapper gin-layer-wrapper">${typeFaces(typeFacesData)}
  </div></div>`;

export const HeadingStyles = () =>
  `<div class="cl-container"><div class="layer-wrapper gin-layer-wrapper">${headingStyles(headingStyleData)}
  </div></div>`;

export const BodyStyles = () =>
  `<div class="cl-container"><div class="layer-wrapper gin-layer-wrapper">${bodyStyles(bodyStyleData)}
  </div></div>`;
