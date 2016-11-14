'use babel';

LanguageMaml = require '../lib/language-maml'

describe 'LanguageMaml', ->
  workspaceElement=null
  activationPromise=null
  grammar=null

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('language-maml')

    waitsForPromise ->
      atom.commands.dispatch(workspaceElement, 'language-maml:toggle')
      return activationPromise;

    runs ->
      grammar = atom.grammars.grammarForScopeName('source.maml')

  describe 'grammar', ->
    it 'parses the grammar', ->
      expect(grammar).toBeTruthy();
      expect(grammar.scopeName).toBe("source.maml")

    it 'parses end-of-line comments', ->
      {tokens} = grammar.tokenizeLine("# I am a comment")

      expect(tokens[0]).toEqual value: "#", scopes: ["source.maml", "comment.line.number-sign.maml", "punctuation.definition.comment.maml"]
