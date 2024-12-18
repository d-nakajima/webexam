# gcloud auth application-default login // terraform実行権限での認証
# terraform init
# terraform plan
# terraform apply

# 利用プロバイダのセットアップ
terraform {
  required_providers {
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 4.0"
    }
  }
}
provider "google-beta" {
  alias = "default"
  user_project_override = true
  region = var.region
}

# クォータチェック(上限割り当て)を回避したプロバイダの設定
provider "google-beta" {
  alias = "no_user_project_override"
  user_project_override = false
}

module "prod" {
  source = "./firebase_project"
  providers = {
    google-beta = google-beta.default
    google-beta.no_user_project_override = google-beta.no_user_project_override
  }
  project_id = var.prod_project_id
  billing_account = var.billing_account
  region = var.region
}

module "stg" {
  source = "./firebase_project"
  providers = {
    google-beta = google-beta.default
    google-beta.no_user_project_override = google-beta.no_user_project_override
  }
  project_id = var.stg_project_id
  billing_account = var.billing_account
  region = var.region
}

module "dev" {
  source = "./firebase_project"
  providers = {
    google-beta = google-beta.default
    google-beta.no_user_project_override = google-beta.no_user_project_override
  }
  project_id = var.dev_project_id
  billing_account = var.billing_account
  region = var.region
}
