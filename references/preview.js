import './preview-head.css';
import './preview-head.js';

import Twig from 'twig';

Twig.cache(false);

const twigComponents = require.context(
  '../../../src/components/',
  true,
  /\.twig$/
);

const twigNamespaceToPath = (name) => {
  if (name.startsWith('otter:') || name.startsWith('@otter/')) {
    const part = name.startsWith('otter:') ? name.split(':')[1] : name.replace('@otter/', '').replace('.twig', '');
    const path = `./${part}/${part}.twig`;
    try {
      const mod = twigComponents(path);
      return mod && mod.default ? mod.default : mod;
    } catch (e) {
      console.error(`Cannot resolve Twig component for '${name}' at '${path}'`);
    }
  }

  try {
    const mod = require(name);
    return mod && mod.default ? mod.default : mod;
  } catch (e) {
    console.error(`Cannot resolve Twig template '${name}'`, e);
    return () => '';
  }
};

Twig.extendFunction('include', (...args) => {
  let [templateName, variables = {}, withContext = false] = args;
  if (typeof withContext !== 'boolean' && variables && typeof variables.with_context !== 'undefined') {
    withContext = variables.with_context;
    delete variables.with_context;
  }

  try {
    const templateFn = twigNamespaceToPath(templateName);
    if (!templateFn) return '';
    const finalContext = withContext && typeof this === 'object'
      ? { ...(this.context || {}), ...variables }
      : variables;
    return templateFn(finalContext);
  } catch (err) {
    console.error(`Twig include() failed for: ${templateName}`, err);
    return '';
  }
});

window.Drupal = window.Drupal || {};
window.Drupal.t = function(str) { return str; };

const overrideParams = {};
export default overrideParams;
