#!/bin/bash

ENVS=("local" "prd")
COMPONENTS=("backend" "db" "frontend" "nginx")
ACTIONS=("build" "up" "down" "restart")

API_LOCAL_URL="api.thesis.edu.vn"
FRONTEND_LOCAL_URL="frontend.thesis.edu.vn"

while getopts "e:a:" opt; do
    case $opt in
        e)
            ENVIRONMENT=$OPTARG
            if ! [[ "$ENVS[@]" =~ "$ENVIRONMENT" ]]; then
                echo "Invalid environment. Choose from: ${ENVS[*]}"
                exit 1
            fi
            source ./docker/env/$ENVIRONMENT/config.sh
            ;;
        a)
            ACTION=$OPTARG
            if ! [[ "${ACTIONS[@]}" =~ "$ACTION" ]]; then
                echo "Invalid action. Choose from: ${ACTIONS[*]}"
                exit 1
            fi
            ;;
        ?)
            echo "Usage: $0 -e <environment> -c <component> -a <action>"
            exit 1
            ;;
    esac
done

function docker_build() {
    docker compose -p ${PROJECT} build "${COMPONENTS[@]}"
}

function docker_up() {
    docker compose -p ${PROJECT} up -d "${COMPONENTS[@]}"
}

echo "Starting ${ACTION} for components: ${COMPONENTS[*]} in environment: ${ENVIRONMENT}"
docker_${ACTION} ${OPTION}