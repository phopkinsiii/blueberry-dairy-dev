
# ✅ Git Workflow Cheatsheet: Syncing Dev to Live (Manual, No Script)

This guide shows the **exact terminal commands** and explains every step to safely sync feature branches from your **Dev app** to your **Live app** using Git.  
Designed for use in **VSCode**, with separate app folders.

---

## ✅ Overview

You have two separate GitHub repos:
1. **Dev Repo** (`blueberry-dairy-dev`) – where you develop and test new features.
2. **Live Repo** (`blueberry-dairy-live`) – where you deploy production-ready code (auto-deployed via Render).

---

## ✅ Tools:
- **VSCode Terminal** (Always work in the root folder of the correct repo.)
- GitHub remotes:
  - `origin` → Default remote for your dev repo.
  - `live` → Remote that points to your live repo from your dev repo.

---

## ✅ 🔥 Important Rule (Before Every Change):
**Always switch to the correct feature branch before making file changes, staging, or committing.**

### ✅ Check your current branch:
```bash
git branch --show-current
```

If it doesn't show your feature branch, switch to it:
```bash
git checkout feature/your-feature-branch
```

> ⚠️ Never start making edits until you're on the correct branch!

---

## ✅ Step-by-Step Process

---

### ✅ Step 1 — Make & Commit Changes in Dev App (Feature Branch)
**Terminal Location:** Dev app (`blueberry-dairy-dev` folder in VSCode Terminal)

1. Make sure you're on your feature branch:
```bash
git branch --show current
If NOT feature/your-feature-branch change to it.
git checkout feature/your-feature-branch
```

2. Edit your files in VSCode as needed.

3. Stage your changes (adds all modified files):
```bash
git add .
```

4. Commit your changes with a descriptive message:
```bash
git commit -m "Describe your changes here"
```

5. Push your feature branch to the Dev repo on GitHub:
```bash
git push origin feature/your-feature-branch
```

---

### ✅ Step 2 — Push Feature Branch to Live Repo
**Terminal Location:** Still in Dev app (`blueberry-dairy-dev` folder)

Push your feature branch to the live repo:
```bash
git push live feature/your-feature-branch
```

✔️ Now your feature branch is available in both **dev** and **live** repos on GitHub.

---

### ✅ Step 3 — Merge Feature Branch into Main in Live Repo
**Terminal Location:** Live app (`blueberry-dairy-live` folder in VSCode Terminal)

1. Fetch latest updates from the remote repo:
```bash
git fetch
```

2. Switch to your feature branch (to make sure it's fully updated locally):
```bash
git checkout feature/your-feature-branch
```

3. Pull the latest version of your feature branch from GitHub:
```bash
git pull origin feature/your-feature-branch
```

4. Switch back to the `main` branch:
```bash
git checkout main
```

5. Merge your feature branch into `main`:
```bash
git merge feature/your-feature-branch
```

6. Push the updated `main` branch to GitHub (this triggers Render deployment):
```bash
git push origin main
```

---

## ✅ Workflow Summary Table

| Step | Task                                      | VSCode Terminal Folder        |
|------|-------------------------------------------|-------------------------------|
| 1    | Commit changes to feature branch          | Dev app (`blueberry-dairy-dev`)  |
| 2    | Push feature branch to live repo          | Dev app (`blueberry-dairy-dev`)  |
| 3    | Merge feature branch into main & deploy   | Live app (`blueberry-dairy-live`) |

---

## ✅ Best Practices Checklist

- ✅ Always confirm you're on the correct branch before editing:
```bash
git branch --show-current
```

- ✅ Keep feature branch names identical in both repos for easier syncing.

- ✅ Only merge into `main` from the **live repo**—never merge in the dev repo.

- ✅ Push to `main` in the live repo only after you've verified everything works on your feature branch.

---

## ✅ Example Quick Reference (For Feature `feature/user-dashboard`):

```bash
# In Dev App Terminal (blueberry-dairy-dev):
git checkout feature/user-dashboard
git add .
git commit -m "Refactor dashboard header"
git push origin feature/user-dashboard
git push live feature/user-dashboard

# Switch to Live App Terminal (blueberry-dairy-live):
git fetch
git checkout feature/user-dashboard
git pull origin feature/user-dashboard
git checkout main
git merge feature/user-dashboard
git push origin main
```

---

## ✅ ✅ Done!
Your changes are now safely merged and deployed to production via Render.

---
