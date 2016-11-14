'use babel';

import LanguageMamlView from './language-maml-view';
import { CompositeDisposable } from 'atom';

export default {

  languageMamlView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageMamlView = new LanguageMamlView(state.languageMamlViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageMamlView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-maml:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageMamlView.destroy();
  },

  serialize() {
    return {
      languageMamlViewState: this.languageMamlView.serialize()
    };
  },

  toggle() {
    console.log('LanguageMaml was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
