import radiiTwig from './radii.twig';
import radiiData from './radii.yml';

export default {
  title: 'Base/Radii',
};

export const Radii = () => radiiTwig(radiiData);
