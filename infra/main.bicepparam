using 'main.bicep'

param resourceGroupName = 'rg-quadeq'
param staticWebAppName = 'quadeq'
param location = 'eastus2'
param sku = 'Free'
param repositoryUrl = 'https://github.com/BretStateham/quadeq'
param branch = 'bstateha/attempt3-claude'
param tags = {
  application: 'quadeq'
  environment: 'dev'
}
