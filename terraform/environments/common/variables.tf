variable "vercel_api_token" {
  type = string
}

variable "vercel_app_name" {
  type = string
}

variable "github_repo" {
  type = string
}

variable "root_directory" {
  type = string
}

variable "vercel_production_domain_name" {
  type = string
  nullable = true
}