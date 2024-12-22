output "firebase_config_base64" {
  value = base64encode(jsonencode(data.google_firebase_web_app_config.default))
}