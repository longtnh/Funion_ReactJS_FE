#!/bin/bash
docker login -u gitlab+deploy-token-398047 -p jtJZgUu3ynZMTwLrRhVx registry.gitlab.com/team5capstonegroup/team5-frontend-react
docker build -t registry.gitlab.com/team5capstonegroup/team5-frontend-react:latest .
docker push registry.gitlab.com/team5capstonegroup/team5-frontend-react:latest
