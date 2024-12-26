variable "vercel_api_token" {
  type = string
  description = "Vercel API Token"
}

variable "vercel_app_name" {
  type = string
  description = "Vercel App Name"
}

variable "github_repo" {
  type = string
  description = "GitHub Repository"
}

variable "root_directory" {
  type = string
  description = "Root Directory"
}

variable "production_domain_name" {
  type = string
  nullable = true
}