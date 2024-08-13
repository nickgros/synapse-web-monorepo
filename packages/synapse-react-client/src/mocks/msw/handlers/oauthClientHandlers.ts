import { OAuthClient, OAuthClientList } from '@sage-bionetworks/synapse-types'
import { SynapseApiResponse } from '../handlers'
import { rest } from 'msw'
import { MOCK_USER_ID } from '../../user/mock_user_profile'
import BasicMockedCrudService from '../util/BasicMockedCrudService'
import { mockOauthClient1, mockOauthClient2 } from '../../oauth/MockClient'

const mockOauthClientService = new BasicMockedCrudService<
  OAuthClient,
  'client_id'
>({
  initialData: [mockOauthClient1, mockOauthClient2],
  idField: 'client_id',
  autoGenerateId: true,
})

export function getOAuthClientHandler(backendOrigin: string) {
  return rest.get(
    `${backendOrigin}/auth/v1/oauth2/client/:clientId`,
    async (req, res, ctx) => {
      const oauthClient = mockOauthClientService.getOneById(
        req.params.clientId as string,
      )

      if (oauthClient) {
        return res(ctx.status(200), ctx.json(oauthClient))
      }

      const errorResponse: SynapseApiResponse<OAuthClient> = {
        reason: `OAuth Client id: '${req.params.clientId}' does not exist`,
      }
      return res(ctx.status(404), ctx.json(errorResponse))
    },
  )
}

export function getOAuthClientListHandler(backendOrigin: string) {
  return rest.get(
    `${backendOrigin}/auth/v1/oauth2/client`,
    async (req, res, ctx) => {
      const fakeNpt = 'fakeNextPageToken'

      let clients = mockOauthClientService.getAll()
      let nextPageToken: string | undefined
      if (req.params.nextPageToken == fakeNpt) {
        clients = clients.slice(1)
        nextPageToken = undefined
      } else {
        clients = clients.slice(0, 1)
        nextPageToken = fakeNpt
      }

      const response: SynapseApiResponse<OAuthClientList> = {
        results: clients,
        nextPageToken: nextPageToken,
      }

      return res(ctx.status(200), ctx.json(response))
    },
  )
}

export function getCreateOAuthClientHandler(backendOrigin: string) {
  return rest.post(
    `${backendOrigin}/auth/v1/oauth2/client`,
    async (req, res, ctx) => {
      const requestBody: OAuthClient = await req.json()

      const createdClient = mockOauthClientService.create({
        ...requestBody,
        createdBy: String(MOCK_USER_ID),
        createdOn: new Date().toISOString(),
        etag: 'etag',
        modifiedOn: new Date().toISOString(),
      })

      return res(ctx.status(201), ctx.json(createdClient))
    },
  )
}

export function getUpdateOAuthClientHandler(backendOrigin: string) {
  return rest.put(
    `${backendOrigin}/auth/v1/oauth2/client/:clientId`,
    async (req, res, ctx) => {
      let oauthClient = mockOauthClientService.getOneById(
        req.params.clientId as string,
      )

      if (req.params.clientId && oauthClient) {
        oauthClient = mockOauthClientService.update(
          String(req.params.clientId),
          await req.json(),
        )

        return res(ctx.status(200), ctx.json(oauthClient))
      }

      const errorResponse: SynapseApiResponse<OAuthClient> = {
        reason: `OAuth Client id: '${req.params.clientId}' does not exist`,
      }
      return res(ctx.status(404), ctx.json(errorResponse))
    },
  )
}

export function getDeleteOAuthClientHandler(backendOrigin: string) {
  return rest.put(
    `${backendOrigin}/auth/v1/oauth2/client/:clientId`,
    async (req, res, ctx) => {
      let oauthClient = mockOauthClientService.getOneById(
        req.params.clientId as string,
      )

      if (req.params.clientId && oauthClient) {
        mockOauthClientService.delete(String(req.params.clientId))

        return res(ctx.status(200), ctx.json(''))
      }

      const errorResponse: SynapseApiResponse<OAuthClient> = {
        reason: `OAuth Client id: '${req.params.clientId}' does not exist`,
      }
      return res(ctx.status(404), ctx.json(errorResponse))
    },
  )
}

export default function getAllOAuthClientHandlers(backendOrigin: string) {
  return [
    getOAuthClientHandler(backendOrigin),
    getOAuthClientListHandler(backendOrigin),
    getCreateOAuthClientHandler(backendOrigin),
    getUpdateOAuthClientHandler(backendOrigin),
    getDeleteOAuthClientHandler(backendOrigin),
  ]
}
