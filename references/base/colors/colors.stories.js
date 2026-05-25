import colorsTwig from './colors.twig';
import colorsData from './colors.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Base/Colors',
};

export const Colors = () =>
  `<div class="cl-container"><div class="layer-wrapper gin-layer-wrapper">
    ${colorsTwig(colorsData)}
  </div></div>`;
