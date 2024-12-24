terraform {
  required_version = "1.10.3"
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.0"
    }
  }
}

resource "vercel_project" "with_git" {
  name = var.vercel_app_name
  framework = "nextjs"
  root_directory = var.root_directory
  automatically_expose_system_environment_variables = true
  ignore_command = <<EOT
#!/bin/bash
# "root_directory" 以下に差分が無ければビルドをスキップ
if git diff --quiet HEAD^ HEAD -- ${var.root_directory}/; then
  echo "No changes in root_directory. Skipping build."
  exit 0
else
  echo "Changes detected in root_directory. Proceed with build."
  exit 1
fi
EOT

  git_repository = {
    type = "github"
    repo = var.github_repo
  }
}
