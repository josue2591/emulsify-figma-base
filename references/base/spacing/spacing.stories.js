import spacingTemplate from './spacing.twig';
import spacingData from './spacing.yml';

export default {
  title: 'Base/Spacing',
};

export const spacing = () => spacingTemplate(spacingData);
