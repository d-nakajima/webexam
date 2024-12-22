# 利用プロバイダのセットアップ
terraform {
  required_version = "1.10.3"
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.0"
    }
  }
  backend "gcs" {
    bucket  = "firelaunch_terraform"
    prefix  = "webexam/common" # プロジェクト名/環境名
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
}

module "vercel" {
  source = "../../modules/vercel"
  vercel_api_token = var.vercel_api_token
  vercel_app_name = var.vercel_app_name
  github_repo = var.github_repo
  root_directory = var.root_directory
}
