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
```bash
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
```

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
```bash
terraform init
```
Initializes providers and backend.

Step 2: Preview Infrastructure
```bash
terraform plan
```
Displays resources that will be created.

Step 3: Deploy Infrastructure
```bash
terraform apply
```
Creates:

Resource Group

Virtual Network

Subnet

Network Security Group (Port 22 and 80 open)

Public IP

Network Interface

Linux Virtual Machine (Ubuntu 22.04)

Step 4: Get Public IP
```bash
terraform output public_ip_address
```
Used for SSH access and browser access.

3. SSH Login to Azure VM

From WSL:
```bash
ssh mario@<PUBLIC_IP>
```
SSH key-based authentication was used.

If permission issues occur:
```bash
chmod 600 ~/.ssh/id_rsa
```

4. Ansible – Server Configuration

Ansible was used to configure the VM automatically.

Run playbook:
```bash
ansible-playbook -i inventory.ini deploy.yml
```
The playbook performed:

System update

Installation of Docker

Installation of Git

Cloning of portfolio repository

Building Docker image

Starting Docker container


5. Docker – Container Deployment Steps

Build Docker Image:
```bash
sudo docker build -t portfolio .
```
Run Container:
```bash
sudo docker run -d -p 80:80 --name portfolio portfolio
```
Stop Container:
```bash
sudo docker stop portfolio
```
Remove Container:
```bash
sudo docker rm portfolio
```
Check Running Containers:
```bash
docker ps
```

6. CI/CD Pipeline – GitHub Actions

Workflow file location:
```bash
.github/workflows/deploy.yml
```
Trigger Condition:
```bash
on:
  push:
    branches:
      - main
```
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
```bash
git pull origin main
sudo docker build -t portfolio .
sudo docker stop portfolio || true
sudo docker rm portfolio || true
sudo docker run -d -p 80:80 --name portfolio portfolio
```
GitHub Secrets Used:

VM_HOST

VM_USER

VM_SSH_KEY

7. Complete Deployment Flow
```bash
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
```
8. Final Result

Portfolio accessible via Public IP

Application running inside Docker container

Infrastructure provisioned using Infrastructure as Code

Automated deployment pipeline implemented

Cloud-native DevOps workflow completed
