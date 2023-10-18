packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = "~> 1"
    }
  }
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "source_ami" {
  type    = string
  default = "ami-06db4d78cb1d3bbf9"
}

variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "subnet_id" {
  type    = string
  default = "subnet-0e00ea503c04d4058"
}

source "amazon-ebs" "cloud-app-ami" {
  region          = "${var.aws_region}"
  ami_name        = "cloud-ami_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "AMI for CSYE6225 Assignment 05"

  ami_users = [
    "856405792108",
  ]
  
  // profile = "dev"
  instance_type   = "t2.micro"
  source_ami      = "${var.source_ami}"
  ssh_username    = "${var.ssh_username}"
  subnet_id       = "${var.subnet_id}"
  
  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  launch_block_device_mappings{
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 8
    volume_type           = "gp2"
  }

}

build {
  sources = ["source.amazon-ebs.cloud-app-ami"]
  provisioner "file" {
    source = "../webapp.zip"
    destination = "~/"
  }
  
  provisioner "shell" {
    script = "setup.sh"
  }
}