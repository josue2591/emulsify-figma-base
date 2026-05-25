import shadowsTwig from './shadows.twig';
import shadowsData from './shadows.yml';

export default {
  title: 'Base/Shadows',
};

export const Shadows = () => shadowsTwig(shadowsData);
