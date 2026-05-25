import breakpointsTwig from './breakpoints.twig';
import breakpointsData from './breakpoints.yml';

export default {
  title: 'Base/Breakpoints',
};

export const breakpoints = () =>
  `<div class="cl-container"><div class="layer-wrapper gin-layer-wrapper">
    ${breakpointsTwig(breakpointsData)}
  </div></div>`;
