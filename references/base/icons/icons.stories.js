import icons from './icons.twig';

// Dynamically import all SVG files in assets/icons root (non-recursive).
// The filenames (minus .svg) are passed as the `name` prop to the Twig template.
const req = require.context('../../../../assets/icons', false, /\.svg$/);
const iconNames = req.keys().map((file) => file.replace('./', '').replace('.svg', ''));

export default {
  title: 'Base/Icons',
};

export const Icons = () =>
  `<div class="cl-container"><div class="layer-wrapper gin-layer-wrapper">
    ${icons({ icons: iconNames })}
  </div></div>`;
