import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vba" is now active!');

  let disposable = vscode.commands.registerCommand("vba.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from vba!");
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
