
# ✅ Git Workflow Cheat Sheet: Dev to Live (with Simplified Remotes)

This workflow assumes:
- You develop in **blueberry-dairy-dev** (Dev App)
- You deploy from **blueberry-dairy-live** (Live App)
- Both repos use `live` as the remote for the production repo (GitHub: blueberry-dairy-live.git)

---

## ✅ Initial Remote Setup (One-Time Setup in Live Repo)
In your **live** repo (blueberry-dairy-live):
```bash
git remote remove origin  # Remove redundant origin
git remote add live https://github.com/phopkinsiii/blueberry-dairy-live.git
```
Now your only remote in the live repo is `live`.

---

## ✅ Full Workflow

### 🔹 In Dev App Terminal (`blueberry-dairy-dev`)
1. Switch to feature branch (always start here **before editing**):
```bash
git checkout feature/user-dashboard
```

2. Stage, commit, and push your changes:
```bash
git add .
git commit -m "Describe your changes here"
git push origin feature/user-dashboard
git push live feature/user-dashboard
```

---

### 🔹 In Live App Terminal (`blueberry-dairy-live`)
1. Fetch changes and sync feature branch:
```bash
git fetch
git checkout feature/user-dashboard
git pull origin feature/user-dashboard
```

2. Merge feature branch into main and push to production:
```bash
git checkout main
git merge feature/user-dashboard --no-edit
git push live main  # ✅ Triggers Render deploy
```

---

## ✅ Notes
- You **only need to push to `live`** in your live repo. No need for `origin` anymore.
- Render auto-deploys when you push to `main` in the **live** repo.
- This setup keeps your workflow consistent and clean across both dev and live repos.

---

## ✅ Optional: Rename Remotes After Cloning
If you ever re-clone the live repo:
```bash
git remote rename origin live
```

---

## ✅ Summary Commands (Quick Reference)

### Dev Repo:
```bash
git checkout feature/your-feature-branch
git add .
git commit -m "Describe change"
git push origin feature/your-feature-branch
git push live feature/your-feature-branch
```

### Live Repo:
```bash
git fetch
git checkout feature/your-feature-branch
git pull origin feature/your-feature-branch
git checkout main
git merge feature/your-feature-branch --no-edit
git push live main  # ✅ Trigger deploy
```
