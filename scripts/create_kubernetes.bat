@echo off

REM Tutorial URL
REM https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app#cloud-shell

REM Docker Container name
set "IMAGE_NAME=travel-agent:v0.1"

REM Repository name on GCP
set "REPOSITORY_NAME=travel-agent"

REM GCP Kubernetes and repo region
set "LOCATION=europe-west1"

REM GCP Project ID
set "PROJECT_ID=travel-agent-387120"

REM GCP Project number
set "PROJECT_NUMBER=784655998615"

REM GCP Kubernetes cluster name
set "KUBERNETES_CLUSTER_NAME=travel-agent"

REM Flask App port
set "FLASK_APP_PORT=5000"

REM Navigate to project folder
cd ../backend

REM Set Google Cloud Project
REM gcloud config set project %PROJECT_ID%

echo "Creating repository"
REM Create repository
REM gcloud artifacts repositories create %REPOSITORY_NAME% --repository-format=docker --location %LOCATION% --description="Docker repository"

echo "Building Docker container"
REM Build Docker container
REM docker build -t %LOCATION%-docker.pkg.dev/%PROJECT_ID%/%REPOSITORY_NAME%/%IMAGE_NAME% .

REM Output the docker container info
REM docker images

REM Add IAM policy bindings to your service account
REM gcloud artifacts repositories add-iam-policy-binding %REPOSITORY_NAME% --location=%LOCATION% --member=serviceAccount:%PROJECT_NUMBER%-compute@developer.gserviceaccount.com --role="roles/artifactregistry.reader"

REM Configure the Docker command-line tool to authenticate to Artifact Registry
REM gcloud auth configure-docker %LOCATION%-docker.pkg.dev

echo "Push Docker image to GCP repository"
REM Push the Docker image to the repository:
REM docker push %LOCATION%-docker.pkg.dev/%PROJECT_ID%/%REPOSITORY_NAME%/%IMAGE_NAME%

REM Set compute engine region
REM gcloud config set compute/region %LOCATION%

REM Create Kubernetes cluster on GCP
REM gcloud container clusters create-auto %KUBERNETES_CLUSTER_NAME%

REM Connect to Kubernetes cluster
REM gcloud container clusters get-credentials %KUBERNETES_CLUSTER_NAME% --region %LOCATION%
kubectl get pods

REM Create a Kubernetes Deployment for the docker image
REM kubectl create deployment %KUBERNETES_CLUSTER_NAME% --image=%LOCATION%-docker.pkg.dev/%PROJECT_ID%/%REPOSITORY_NAME%/%IMAGE_NAME%

REM Set the baseline number of Deployment replicas to 3
REM kubectl scale deployment %KUBERNETES_CLUSTER_NAME% --replicas=3

REM Create a HorizontalPodAutoscaler resource for your Deployment
REM kubectl autoscale deployment %KUBERNETES_CLUSTER_NAME% --cpu-percent=80 --min=1 --max=5

REM Use the kubectl expose command to generate a Kubernetes Service
REM kubectl expose deployment %KUBERNETES_CLUSTER_NAME% --name=%KUBERNETES_CLUSTER_NAME%-service --type=LoadBalancer --port 80 --target-port %FLASK_APP_PORT%

REM Get service details (may need some time to complete)
kubectl get service

REM Get the Kubernetes cluster URL
kubectl get svc "%KUBERNETES_CLUSTER_NAME%"-service -o=jsonpath="{.status.loadBalancer.ingress[0].ip}"

REM See created pods (may need some time to complete)
kubectl get pods

REM Go back to original directory
cd ../scripts

pause