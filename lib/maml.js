'use babel';

import MamlView from './maml-view';
import { CompositeDisposable } from 'atom';

export default {

  MamlView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.MamlView = new MamlView(state.MamlViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.MamlView.getElement(),
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
    this.MamlView.destroy();
  },

  serialize() {
    return {
      MamlViewState: this.MamlView.serialize()
    };
  },

  toggle() {
    console.log('MAML was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
