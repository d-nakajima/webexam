terraform {
  required_version = "1.10.3"
  required_providers {
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 6.0"
    }
  }
  backend "gcs" {
    bucket  = "firelaunch_terraform"
    prefix  = "webexam/dev" # プロジェクト名/環境名
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

module "firebase" {
  source = "../../modules/firebase"
  providers = {
    google-beta = google-beta.default
    google-beta.no_user_project_override = google-beta.no_user_project_override
  }
  project_id = var.project_id
  billing_account = var.billing_account
  region = var.region
}
