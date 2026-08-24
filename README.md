# Justine & Alex's Wedding Website 💍

A beautiful wedding website built with React, Vite, and Tailwind CSS.

## ✏️ Quick Edit Guide (For Non-Technical Users)

Need to update the website content? You can edit the text directly on GitHub without any technical knowledge!

### What You Can Edit:

**📝 About Us Story & FAQ Answers**
- Click here to edit: [translations.ts](https://github.com/JustineAndAlex/JustineAndAlex.github.io/blob/master/src/lib/translations.ts)

#### How to Edit on GitHub:

1. **Click the link above** - It will take you to GitHub
2. **Click the pencil icon** (✏️) in the top right corner that says "Edit this file"
3. **Make your changes:**
   - **About Us Story**: Look for `story:` around line 31 (English) or line 136 (French)
   - **FAQ Answers**: Look for `faq:` section starting around line 61 (English) or line 156 (French)
4. **Preview your changes** - Click the "Preview" tab to see how it looks
5. **Save your changes:**
   - Scroll to the bottom
   - Add a short description of what you changed (e.g., "Updated FAQ answer")
   - Click "Commit changes"
6. **Wait 2-3 minutes** - Your changes will automatically appear on the live website!

💡 **Tip:** Be careful not to delete any quotation marks (`"`) or special characters. Just edit the text between the quotes.

## 🚀 Running the Website Locally

Want to see your changes before they go live? Here's how to run the website on your computer:

### First Time Setup

1. **Make sure you have Node.js installed**
   - Download it from [nodejs.org](https://nodejs.org/) if you don't have it
   - To check if you have it, open Terminal and type: `node --version`

2. **Install the project dependencies**
   - Open Terminal
   - Navigate to the project folder: `cd /path/to/JustineAndAlex.github.io`
   - Run: `npm install`
   - This only needs to be done once (or when dependencies change)

### Running the Site

Every time you want to preview the website locally:

1. Open Terminal
2. Navigate to the project folder: `cd /path/to/JustineAndAlex.github.io`
3. Run: `npm run dev`
4. Open your browser and go to: `http://localhost:5173`
5. The site will automatically refresh when you make changes!
6. Press `Ctrl+C` in Terminal to stop the local server when you're done

## 📤 Publishing Your Changes

When you're happy with your changes and want to publish them to the live website:

1. **Save your changes** in VS Code or your editor
2. **Commit your changes** (this packages up your changes):
   ```bash
   git add .
   git commit -m "Describe what you changed"
   ```
3. **Push to GitHub** (this uploads your changes):
   ```bash
   git push
   ```

### What Happens After You Push?

1. **GitHub Actions starts automatically** - You can watch the progress in the "Actions" tab on GitHub
2. **Your site gets built** - Takes about 2-3 minutes
3. **Deploys to GitHub Pages** - Your changes go live automatically
4. **Visit your site** - Go to https://justineandalex.github.io to see your changes

💡 **Tip:** If you push changes and don't see them on the live site:
- Wait 2-3 minutes for the deployment to complete
- Check the "Actions" tab on GitHub to make sure it finished successfully
- Do a hard refresh in your browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

## 🛠️ Technology Stack

- **React** - The UI framework
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Styling
- **TypeScript** - Type-safe JavaScript
- **GitHub Pages** - Free hosting
- **GitHub Actions** - Automatic deployment

## 📄 License

MIT License - See LICENSE file for details
