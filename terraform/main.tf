terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project     = var.project_id
  region      = var.region
  //credentials = file("terraform.json")
}

# --------------------------
# Enable Required Google Cloud APIs
# --------------------------
resource "google_project_service" "compute_api" {
  project = var.project_id
  service = "compute.googleapis.com"
}

resource "google_project_service" "iam_api" {
  project = var.project_id
  service = "iam.googleapis.com"
}

resource "google_project_service" "cloudresourcemanager_api" {
  project = var.project_id
  service = "cloudresourcemanager.googleapis.com"
}

resource "google_project_service" "vpc_access_api" {
  project = var.project_id
  service = "vpcaccess.googleapis.com"
}

resource "google_project_service" "servicenetworking_api" {
  project = var.project_id
  service = "servicenetworking.googleapis.com"
}

# --------------------------
# Create VPC Network
# --------------------------
resource "google_compute_network" "custom_vpc" {
  name                    = "custom-vpc"
  auto_create_subnetworks = false
  depends_on              = [google_project_service.compute_api]
}

# --------------------------
# Create Subnetwork
# --------------------------
resource "google_compute_subnetwork" "custom_subnet" {
  name          = "custom-subnet"
  network       = google_compute_network.custom_vpc.id
  ip_cidr_range = "10.10.0.0/16"
  region        = var.region
  depends_on    = [google_project_service.compute_api]
}

# --------------------------
# Firewall Rule (Allow HTTP & API Access)
# --------------------------
resource "google_compute_firewall" "allow_http" {
  name    = "allow-http"
  network = google_compute_network.custom_vpc.name

  allow {
    protocol = "tcp"
    ports    = ["80", "3000", "5400"]
  }

  source_ranges = ["0.0.0.0/0"]
  depends_on    = [google_project_service.compute_api]
}

# --------------------------
# Create Compute Engine VM
# --------------------------
resource "google_compute_instance" "docker_vm" {
  name         = "docker-vm"
  machine_type = "e2-medium"
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2204-lts"
      size  = 20
    }
  }

  network_interface {
    network    = google_compute_network.custom_vpc.id
    subnetwork = google_compute_subnetwork.custom_subnet.id

    access_config {
      # Assigns a public IP
    }
  }

  # --------------------------
  # Startup Script to Install Docker & Run App
  # --------------------------
  metadata_startup_script = <<-EOT
    #! /bin/bash
    sudo apt update && sudo apt install -y docker docker-compose
    sudo usermod -aG docker $USER
    newgrp docker

    # Clone your repo (replace with your actual repo URL)
    git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO.git /home/ubuntu/app
    cd /home/ubuntu/app

    # Start Docker Compose
    sudo docker-compose up -d
  EOT

  tags = ["http-server"]
  depends_on = [google_project_service.compute_api]
}
