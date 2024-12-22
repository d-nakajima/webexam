terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.0"
    }
  }
}

resource "vercel_project_environment_variables" "default" {
  project_id = var.vercel_project_id
  variables = [{
    key = "NEXT_PUBLIC_FIREBASE_CONFIG_BASE64"
    value = var.firebase_config_base64
    target = ["preview"]
  }]
}