'use babel';

import LanguageMaml from '../lib/language-maml';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('LanguageMaml', () => {
  let workspaceElement, activationPromise, grammar;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('language-maml');
    grammar = atom.grammars.grammarForScopeName('source.maml')
  });

  describe('grammar', () => {
    it('loads', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'language-maml:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
      });
    });
  });
});
