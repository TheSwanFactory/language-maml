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
    waitsForPromise(() => {
      atom.commands.dispatch(workspaceElement, 'language-maml:toggle');
      return activationPromise;
    });
    runs(() => {
      grammar = atom.grammars.grammarForScopeName('source.maml')
    });
  });

  describe('grammar', () => {
    it('loads', () => {
      expect(grammar).toBeTruthy();
    });
  });
});
