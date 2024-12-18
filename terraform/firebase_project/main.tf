# GCPプロジェクトの作成
resource "google_project" "default" {
  provider   = google-beta.no_user_project_override
  name       = var.project_id
  project_id = var.project_id
  billing_account = var.billing_account
  labels = {
    "firebase" = "enabled"
  }
}

# 各APIの有効化
resource "google_project_service" "default" {
  provider = google-beta.no_user_project_override
  project = google_project.default.project_id
  for_each = toset([
    "serviceusage.googleapis.com",
    "cloudbuild.googleapis.com",
    "cloudbilling.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    # "iam.googleapis.com",
    # "compute.googleapis.com",
    "firebase.googleapis.com",
    "identitytoolkit.googleapis.com",
    "firestore.googleapis.com",
    "firebaserules.googleapis.com",
    "firebasestorage.googleapis.com",
    "storage.googleapis.com",
    "cloudfunctions.googleapis.com",
    "firebasehosting.googleapis.com",
  ])
  service = each.key
  disable_on_destroy = false
}

# Firebaseの有効化
resource "google_firebase_project" "default" {
  provider = google-beta
  project  = google_project.default.project_id

  depends_on = [
    google_project_service.default
  ]
}

resource "google_firebase_project_location" "default" {
  provider = google-beta
  project  = google_project.default.project_id
  location_id = var.region
}

# Firestore
resource "google_firestore_database" "default" {
  provider   = google-beta.no_user_project_override
  project                     = google_project.default.project_id
  name                        = "(default)"
  location_id                 = var.region
  type                        = "FIRESTORE_NATIVE"
  concurrency_mode            = "OPTIMISTIC"
  app_engine_integration_mode = "DISABLED"

  depends_on = [
    google_firebase_project.default,
  ]
}


# Firebase の Cloud Storage を使用するには 先に App Engine の有効化が必要
resource "google_app_engine_application" "default" {
  provider   = google-beta
  project     = google_project.default.project_id
  location_id = var.region

  # Cloud Firestore DB を作成する場合は、その作成を待つ必要がある
  depends_on = [
    google_firestore_database.default,
  ]
}

# Storage バケット
resource "google_firebase_storage_bucket" "default" {
  provider   = google-beta
  project   = google_project.default.project_id
  bucket_id = google_app_engine_application.default.default_bucket
}


# FirebaseAuthenticationの有効化
resource "google_identity_platform_config" "default" {
  provider   = google-beta
  project  = google_project.default.project_id

  depends_on = [
    google_project_service.default,
  ]
}
resource "google_identity_platform_project_default_config" "default" {
  provider   = google-beta
  project  = google_project.default.project_id
  sign_in {
    allow_duplicate_emails = false
  }

  depends_on = [
    google_identity_platform_config.default
  ]
}



# data "google_compute_default_service_account" "default" {
#   provider = google-beta
#   project = google_project.default.project_id
# }

# resource "google_project_iam_member" "service_account_token_creator" {
#   provider = google-beta
#   project = google_project.default.project_id
#   role    = "roles/iam.serviceAccountTokenCreator"
#   member  = "serviceAccount:${data.google_compute_default_service_account.default.email}"
#   depends_on = [
#     google_project_service.default
#   ]
# }