import 'reflect-metadata'

import { TimerInterface } from '@standardnotes/time'

import { DomainEventFactory } from './DomainEventFactory'

describe('DomainEventFactory', () => {
  let timer: TimerInterface

  const createFactory = () => new DomainEventFactory(timer)

  beforeEach(() => {
    timer = {} as jest.Mocked<TimerInterface>
    timer.getTimestampInMicroseconds = jest.fn().mockReturnValue(1)
    timer.getUTCDate = jest.fn().mockReturnValue(new Date(1))
  })

  it('should create a WORKSPACE_INVITE_CREATED event', () => {
    expect(
      createFactory().createWorkspaceInviteCreatedEvent({
        inviterUuid: '1-2-3',
        inviteeEmail: 'test@test.te',
        inviteUuid: 'i-1-2-3',
        workspaceUuid: 'w-1-2-3',
      }),
    ).toEqual({
      createdAt: expect.any(Date),
      meta: {
        correlation: {
          userIdentifier: '1-2-3',
          userIdentifierType: 'uuid',
        },
        origin: 'workspace',
      },
      payload: {
        inviterUuid: '1-2-3',
        inviteeEmail: 'test@test.te',
        inviteUuid: 'i-1-2-3',
        workspaceUuid: 'w-1-2-3',
      },
      type: 'WORKSPACE_INVITE_CREATED',
    })
  })
})