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

  describe('when the language-maml:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.language-maml')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'language-maml:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.language-maml')).toExist();

        let languageMamlElement = workspaceElement.querySelector('.language-maml');
        expect(languageMamlElement).toExist();

        let languageMamlPanel = atom.workspace.panelForItem(languageMamlElement);
        expect(languageMamlPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'language-maml:toggle');
        expect(languageMamlPanel.isVisible()).toBe(false);
      });
    });
  });
});
