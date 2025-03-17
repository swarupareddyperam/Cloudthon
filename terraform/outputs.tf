output "vm_external_ip" {
  description = "Public IP address of the Compute Engine VM"
  value       = google_compute_instance.docker_vm.network_interface[0].access_config[0].nat_ip
}
