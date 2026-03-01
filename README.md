Automated Portfolio Deployment – Project Overview

This project demonstrates a fully automated cloud deployment pipeline using:

Terraform (Infrastructure as Code)

Microsoft Azure (Cloud Infrastructure)

Ansible (Configuration Management)

Docker (Containerization)

GitHub Actions (CI/CD Automation)

Windows Subsystem for Linux (Development Environment)

1. Portfolio Website – File Structure

Project Root: ojas-portfolio

ojas-portfolio/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── .gitignore
├── Dockerfile
├── index.html
├── style.css
├── script.js
│
├── images/
│   └── (image files)
│
└── video/
    └── (background video files)

File Description:

index.html – Main portfolio webpage

style.css – Website styling

script.js – JavaScript functionality

images/ – Image assets

video/ – Background video assets

Dockerfile – Defines how Docker builds the container

.github/workflows/deploy.yml – CI/CD automation pipeline

2. Terraform – Infrastructure Deployment Steps

Terraform was used to provision Azure infrastructure.

Step 1: Initialize Terraform

terraform init

Initializes providers and backend.

Step 2: Preview Infrastructure

terraform plan

Displays resources that will be created.

Step 3: Deploy Infrastructure

terraform apply

Creates:

Resource Group

Virtual Network

Subnet

Network Security Group (Port 22 and 80 open)

Public IP

Network Interface

Linux Virtual Machine (Ubuntu 22.04)

Step 4: Get Public IP

terraform output public_ip_address

Used for SSH access and browser access.

3. SSH Login to Azure VM

From WSL:

ssh mario@<PUBLIC_IP>

SSH key-based authentication was used.

If permission issues occur:

chmod 600 ~/.ssh/id_rsa
4. Ansible – Server Configuration

Ansible was used to configure the VM automatically.

Run playbook:

ansible-playbook -i inventory.ini deploy.yml

The playbook performed:

System update

Installation of Docker

Installation of Git

Cloning of portfolio repository

Building Docker image

Starting Docker container

5. Docker – Container Deployment Steps

Build Docker Image:

sudo docker build -t portfolio .

Run Container:

sudo docker run -d -p 80:80 --name portfolio portfolio

Stop Container:

sudo docker stop portfolio

Remove Container:

sudo docker rm portfolio

Check Running Containers:

docker ps
6. CI/CD Pipeline – GitHub Actions

Workflow file location:

.github/workflows/deploy.yml

Trigger Condition:

on:
  push:
    branches:
      - main

The pipeline runs automatically when changes are pushed to the main branch.

Pipeline Process:

Checkout repository

Setup SSH key from GitHub Secrets

SSH into Azure VM

Pull latest code

Rebuild Docker image

Stop old container

Remove old container

Run updated container

Commands executed inside VM by pipeline:

git pull origin main
sudo docker build -t portfolio .
sudo docker stop portfolio || true
sudo docker rm portfolio || true
sudo docker run -d -p 80:80 --name portfolio portfolio

GitHub Secrets Used:

VM_HOST

VM_USER

VM_SSH_KEY

7. Complete Deployment Flow

Developer (WSL)
↓
Terraform creates Azure Infrastructure
↓
SSH access to Virtual Machine
↓
Ansible installs and configures Docker
↓
Docker runs portfolio container
↓
GitHub Actions automates deployment on every push

8. Final Result

Portfolio accessible via Public IP

Application running inside Docker container

Infrastructure provisioned using Infrastructure as Code

Automated deployment pipeline implemented

Cloud-native DevOps workflow completed
