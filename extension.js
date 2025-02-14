const vscode = require('vscode');
const axios = require('axios');

const API_KEY = 'AIzaSyBUCKx1Gtcpa2v4Qytg4frg7EEdHiyM_Lc';
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + API_KEY;

async function analyzeCode() {  
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        console.log("Editor not activated");
        vscode.window.showErrorMessage("No active editor found!");
        return;
    }
    const options = ["Error Analysis", "Suggestions for Improvement", "Auto-Complete Next Lines"];
    const choice = await vscode.window.showQuickPick(options, {
        placeHolder: "Choose an action for your code",
    });

    if (!choice) {
        vscode.window.showInformationMessage("Action cancelled.");
        return;
    }    
    const code = editor.document.getText();

    let prompt = '';
    switch (choice) {
        case "Error Analysis":
            prompt = `Analyse the code and list all the errors. The code is:\n\n${code}`;
            break;
        case "Suggestions for Improvement":
            prompt = `Suggest improvements for the following code:\n\n${code}`;
            break;
        case "Auto-Complete Next Lines":
            prompt = `Predict and complete the next few lines of this code:\n\n${code}`;
            break;
        default:
            return;
    }
    try {
        const response = await axios.post(API_URL, {
            contents: [{ role: "user", parts: [{ text: prompt }] }]  
        });   

        console.log("Full API Response:", JSON.stringify(response.data, null, 2));

        const analysisText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!analysisText) {
            throw new Error("Invalid response format from Gemini API");
        }

        vscode.window.showInformationMessage("Analysis of the code complete.");

		const markdownContent = new vscode.MarkdownString(analysisText);
        const doc = await vscode.workspace.openTextDocument({
            content: analysisText,
            language: 'markdown'
        });
        
        // Show the document in a new editor
        await vscode.window.showTextDocument(doc, {
            viewColumn: vscode.ViewColumn.Beside,
            preview: true
        });
        
        // Open the markdown preview
        await vscode.commands.executeCommand('markdown.showPreview',doc.uri)
    } catch (error) {
        console.error("Error details:", error);
        const errorMessage = error.response?.data?.error?.message || error.message;
        vscode.window.showErrorMessage("Error analyzing code: " + errorMessage);
    }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('Error', analyzeCode);
    context.subscriptions.push(disposable);
}
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
