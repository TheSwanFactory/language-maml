'use babel';

import MamlStubView from './maml-stub-view';
import { CompositeDisposable } from 'atom';

export default {

  mamlStubView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.mamlStubView = new MamlStubView(state.mamlStubViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.mamlStubView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'maml-stub:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.mamlStubView.destroy();
  },

  serialize() {
    return {
      mamlStubViewState: this.mamlStubView.serialize()
    };
  },

  toggle() {
    console.log('MamlStub was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
