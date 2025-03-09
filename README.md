# Code Analysis VS Code Extension  

This Visual Studio Code extension provides error analysis, code improvement suggestions, and auto-completion for your code. It integrates with the Gemini AI API to analyze and enhance your code directly within VS Code.  

## Features  
- **Error Analysis**: Identifies and lists errors in your code.  
- **Suggestions for Improvement**: Provides recommendations to optimize and improve your code.  
- **Auto-Complete Next Lines**: Predicts and generates the next lines of your code.  

## Installation  
1. Clone the repository:  
   ```sh
   git clone https://github.com/harsha-616/VSExtension.git
   cd VSExtension
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Open the project in VS Code:  
   ```sh
   code .
   ```
4. Build and run the extension:  
   ```sh
   npm run test
   ```

## Usage  
1. Open a file in the VS Code editor.  
2. Press `Ctrl + Shift + P` (Windows/Linux) or `Cmd + Shift + P` (Mac) to open the command palette.  
3. Search for and select **"Error Analysis"**.  
4. Choose one of the available actions:  
   - **Error Analysis**  
   - **Suggestions for Improvement**  
   - **Auto-Complete Next Lines**  

## API Integration  
This extension uses Google Gemini AI for code analysis.  
API Endpoint:  
```
https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent
```

