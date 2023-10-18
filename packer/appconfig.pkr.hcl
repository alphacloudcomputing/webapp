packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = "~> 1"
    }
  }
}

variable "aws_region" {
  type = string
}

variable "source_ami" {
  type = string
}

variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "subnet_id" {
  type = string
}

source "amazon-ebs" "cloud-app-ami" {
  region          = "${var.aws_region}"
  ami_name        = "cloud-ami_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "AMI for CSYE6225 Assignment 05"

  ami_users = [
    "856405792108",
  ]

  // profile = "dev"
  instance_type = "t2.micro"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"
  subnet_id     = "${var.subnet_id}"

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 8
    volume_type           = "gp2"
  }

}

build {
  sources = ["source.amazon-ebs.cloud-app-ami"]
  provisioner "shell" {
    script = "setup.sh"

    environment_vars = ["DATABASE_NAME=${var.DATABASE_NAME}", "DATABASE_USER=${var.DATABASE_USER}", "HOSTNAME=${var.HOSTNAME}",
    "DATABASE_PASSWORD=${var.DATABASE_PASSWORD}"]
  }

  provisioner "file" {
    source      = "../webapp.zip"
    destination = "~/"
  }

  provisioner "shell" {
    script = "app-setup.sh"
  }
}