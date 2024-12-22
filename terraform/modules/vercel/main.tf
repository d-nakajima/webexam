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

  git_repository = {
    type = "github"
    repo = var.github_repo
  }
}
