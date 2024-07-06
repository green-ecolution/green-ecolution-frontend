#! /bin/bash

SERVER="http://localhost:3000"
API_DOCS_PATH="swagger/doc.json"
API_DOCS_FILE="./api-docs.json"

function fetch_api_docs() {
  echo "🌎 Fetching api docs from $SERVER/$API_DOCS_PATH"
  curl "$SERVER/$API_DOCS_PATH" > $API_DOCS_FILE 2> /dev/null 
  exit_on_error "Error during polling. Has the server been started?"
}

function clean_up() {
    echo "🧹 Cleaning up src directory..."
    rm -rf src/
    mkdir src/

    exit_on_error "Could not delete the src folder"
}

function generate_client() {
  openapi-generator-cli generate \
    -i $API_DOCS_FILE \
    -o src/ \
    -g typescript-fetch \
    --language-specific-primitives \
    --reserved-words-mappings \
    --additional-properties=supportsES6=true

  exit_on_error "Could not create the client"
}

function revise_generation() {
    echo "🪄 Revision of the generated client"

    # Nothing to do here for now
    echo " Nothing to do here for now"
}


function exit_on_error() {
  if [ $? -ne 0 ]; then
    echo "❌ $1"
    exit 1
  fi
}

function main() {
  fetch_api_docs
  clean_up
  generate_client
  revise_generation

  echo "✨ Done"
}

main

