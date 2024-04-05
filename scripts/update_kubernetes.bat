@echo off

REM Tutorial URL
REM https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app#cloud-shell

REM Define variables (change IMAGE_NAME everytime you update)
set "IMAGE_NAME=travel-agent:v0.1.0"
set "REPOSITORY_NAME=travel-agent"
set "LOCATION=europe-west1"
set "PROJECT_ID=travel-agent-387120"
set "PROJECT_NUMBER=784655998615"
set "KUBERNETES_CLUSTER_NAME=travel-agent"
set "FLASK_APP_PORT=5000"

REM Navigate to project folder
cd ../backend

REM Build and tag a new hello-app Docker image.
docker build -t %LOCATION%-docker.pkg.dev/%PROJECT_ID%/%REPOSITORY_NAME%/%IMAGE_NAME% .

REM Push the image to Artifact Registry.
docker push %LOCATION%-docker.pkg.dev/%PROJECT_ID%/%REPOSITORY_NAME%/%IMAGE_NAME%

REM Apply a rolling update to the existing hello-app Deployment with an image update
kubectl set image deployment/%KUBERNETES_CLUSTER_NAME% %KUBERNETES_CLUSTER_NAME%=%LOCATION%-docker.pkg.dev/%PROJECT_ID%/%REPOSITORY_NAME%/%IMAGE_NAME%

REM Watch the running Pods
kubectl get pods

REM Go back to original directory
cd ../scripts

pause