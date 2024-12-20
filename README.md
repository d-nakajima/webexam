## 構築ステップ

0. github repositoryの初期化

```bash
brew install gh
# arch -arm64 brew install gh
# brew upgrade gh

gh auth login
gh repo create __name__ --private
# gh repo fork --fork-name __name__ 

git init
git branch -M main
git remote add origin https://github.com/__username__/__name__

```

`git 

1. terraformによるインフラの整備

[terraformのREADME](./terraform/README.md)を参照

2. firebaseの設定

`.firebaserc`に任意の設定を登録