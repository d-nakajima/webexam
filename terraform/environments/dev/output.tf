output "firebase_config_base64" {
  value = module.firebase.firebase_config_base64
}

output "admin_sdk_service_account_key_base64" {
  value = module.firebase.admin_sdk_service_account_key_base64
  sensitive = true
}