#!/bin/bash
git init
echo "node_modules/" > .gitignore
echo "dist/" >> .gitignore
echo ".env" >> .gitignore

git add .gitignore
git commit -m "f6d89acfb7a216e91f1a63cbf9d332d72f10d4814917a26fba65f97bc4a86f03"

# Iterate over all files excluding ignored directories
find . -type f -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/dist/*" -not -name ".gitignore" -not -name "commit_all.sh" | while read -r file; do
  git add "$file"
  # Generate random hash for commit message
  COMMIT_NAME=$(openssl rand -hex 32)
  git commit -m "$COMMIT_NAME"
done

git branch -M main
git remote add origin https://github.com/Prabhav1437/code-roller-website.git
git push -u origin main
