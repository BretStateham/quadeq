metadata name = 'QuadEq Static Web App'
metadata description = 'Deploys an Azure Static Web App for the QuadEq SvelteKit application.'

targetScope = 'subscription'

/* Parameters */

@description('Name of the resource group.')
param resourceGroupName string

@description('Name of the Static Web App resource.')
param staticWebAppName string

@description('Azure region for the Static Web App. Free tier only supports specific regions.')
@allowed([
  'centralus'
  'eastus2'
  'eastasia'
  'westeurope'
  'westus2'
])
param location string = 'eastus2'

@description('SKU for the Static Web App.')
@allowed([
  'Free'
  'Standard'
])
param sku string = 'Free'

@description('GitHub repository URL.')
param repositoryUrl string

@description('Branch to deploy from.')
param branch string

@description('Resource tags.')
param tags object = {}

/* Resources */

resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: resourceGroupName
  location: location
  tags: tags
}

module staticWebApp 'staticWebApp.bicep' = {
  scope: rg
  name: 'staticWebApp'
  params: {
    staticWebAppName: staticWebAppName
    location: location
    sku: sku
    repositoryUrl: repositoryUrl
    branch: branch
    tags: tags
  }
}

/* Outputs */

@description('The default hostname of the Static Web App.')
output defaultHostname string = staticWebApp.outputs.defaultHostname

@description('The resource name - use to retrieve deployment token via: az staticwebapp secrets list --name <name>')
output staticWebAppName string = staticWebApp.outputs.staticWebAppName

@description('The resource ID of the Static Web App.')
output resourceId string = staticWebApp.outputs.resourceId

@description('The resource group name.')
output resourceGroupName string = rg.name
