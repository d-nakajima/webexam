variable "prod_project_id" {
  description = "The project ID for prod"
  type = string
  nullable = false
}

variable "stg_project_id" {
  description = "The project ID for stg"
  type = string
  nullable = false
}

variable "dev_project_id" {
  description = "The project ID for dev"
  type = string
  nullable = false
}


variable "billing_account" {
  description = "Billing account ID for the project"
  type = string
  nullable = false
}

variable "region" {
  type = string
  nullable = false
}
