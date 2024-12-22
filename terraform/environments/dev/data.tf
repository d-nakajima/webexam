# common の state を読み込む
data "terraform_remote_state" "common" {
  backend = "gcs"
  config = {
    bucket  = "firelaunch_terraform"
    prefix  = "webexam/common" # プロジェクト名/環境名
  }
}
