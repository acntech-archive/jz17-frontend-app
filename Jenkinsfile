node ('jz17-builder') {

  stage('Sjekk ut kode') {
    checkout scm
    env.GIT_COMMIT = sh(script: "git rev-parse HEAD", returnStdout: true).trim()
  }

  stage('Build environment setup') {
    env.FORMATTED_BRANCH_NAME = env.BRANCH_NAME.replaceAll("[^A-Za-z0-9-]", "_").toLowerCase()
    println "Formattert branch navn: " + env.FORMATTED_BRANCH_NAME
    sh 'env | sort'
  }

  stage('Bygg Docker image') {
    sh 'docker-compose -f docker-compose.ci.yml build'
  }

  stage('Push image') {
    sh 'docker-compose -f docker-compose.ci.yml push'
  }
}