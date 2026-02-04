metadata name = 'Static Web App Module'
metadata description = 'Deploys an Azure Static Web App resource.'

/* Parameters */

@description('Name of the Static Web App resource.')
param staticWebAppName string

@description('Azure region for the Static Web App.')
param location string

@description('SKU for the Static Web App.')
param sku string

@description('GitHub repository URL.')
param repositoryUrl string

@description('Branch to deploy from.')
param branch string

@description('Resource tags.')
param tags object = {}

/* Resources */

resource staticWebApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: staticWebAppName
  location: location
  tags: tags
  sku: {
    name: sku
    tier: sku
  }
  properties: {
    repositoryUrl: repositoryUrl
    branch: branch
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    provider: 'GitHub'
    buildProperties: {
      appLocation: '/'
      apiLocation: ''
      outputLocation: 'build'
      skipGithubActionWorkflowGeneration: true
    }
  }
}

/* Outputs */

@description('The default hostname of the Static Web App.')
output defaultHostname string = staticWebApp.properties.defaultHostname

@description('The resource name.')
output staticWebAppName string = staticWebApp.name

@description('The resource ID of the Static Web App.')
output resourceId string = staticWebApp.id
