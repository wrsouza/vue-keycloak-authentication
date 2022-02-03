import Keycloak from 'keycloak-js'

interface KeycloakCredentials {
  "auth-server-url": string
  "realm": string
  "resource": string
  "ssl-required": string
  "public-client": boolean
  "confidential-port": number
}

const keycloakCredentials: KeycloakCredentials = JSON.parse(process.env.VUE_APP_KEYCLOAK_CREDENTIALS)

const config = {
  url: keycloakCredentials['auth-server-url'],
  realm: keycloakCredentials['realm'],
  clientId: keycloakCredentials['resource'],
}

export const keycloak = Keycloak(config)