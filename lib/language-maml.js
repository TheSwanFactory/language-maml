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

    // Register command that toggles this view
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-maml:toggle': () => this.toggle()
    }));

    // Register smart-quote insertion
    this.insert_smart_quotes = new CompositeDisposable();
    this.insert_smart_quotes.add(atom.commands.add('atom-text-editor', {
      'language-maml:insert-smart-quotes': (e) => {
        editor = atom.workspace.getActiveTextEditor();
        editor.insertText("“”");
        editor.moveLeft();        
      }

    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.insert_smart_quotes.dispose();
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
