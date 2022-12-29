import { Result, UseCaseInterface, Uuid } from '@standardnotes/domain-core'
import { VerifiedAuthenticationResponse, verifyAuthenticationResponse } from '@simplewebauthn/server'
import { AuthenticatorDevice } from '@simplewebauthn/typescript-types'

import { AuthenticatorChallengeRepositoryInterface } from '../../Authenticator/AuthenticatorChallengeRepositoryInterface'
import { AuthenticatorRepositoryInterface } from '../../Authenticator/AuthenticatorRepositoryInterface'
import { VerifyAuthenticatorAuthenticationResponseDTO } from './VerifyAuthenticatorAuthenticationResponseDTO'
import { RelyingParty } from '../../Authenticator/RelyingParty'

export class VerifyAuthenticatorAuthenticationResponse implements UseCaseInterface<boolean> {
  constructor(
    private authenticatorRepository: AuthenticatorRepositoryInterface,
    private authenticatorChallengeRepository: AuthenticatorChallengeRepositoryInterface,
  ) {}

  async execute(dto: VerifyAuthenticatorAuthenticationResponseDTO): Promise<Result<boolean>> {
    const userUuidOrError = Uuid.create(dto.userUuid)
    if (userUuidOrError.isFailed()) {
      return Result.fail(`Could not verify authenticator authentication response: ${userUuidOrError.getError()}`)
    }
    const userUuid = userUuidOrError.getValue()

    const authenticatorChallenge = await this.authenticatorChallengeRepository.findByUserUuid(userUuid)
    if (!authenticatorChallenge) {
      return Result.fail('Could not verify authenticator authentication response: challenge not found')
    }

    const authenticator = await this.authenticatorRepository.findByUserUuidAndCredentialId(
      userUuid,
      Buffer.from(dto.registrationCredential.id as string),
    )
    if (!authenticator) {
      return Result.fail(
        `Could not verify authenticator authentication response: authenticator ${dto.registrationCredential.id} not found`,
      )
    }

    let verification: VerifiedAuthenticationResponse
    try {
      verification = await verifyAuthenticationResponse({
        credential: dto.registrationCredential,
        expectedChallenge: authenticatorChallenge.props.challenge.toString(),
        expectedOrigin: `https://${RelyingParty.RP_ID}`,
        expectedRPID: RelyingParty.RP_ID,
        authenticator: {
          counter: authenticator.props.counter,
          credentialID: authenticator.props.credentialId,
          credentialPublicKey: authenticator.props.credentialPublicKey,
          transports: authenticator.props.transports,
        } as AuthenticatorDevice,
      })

      if (!verification.verified) {
        return Result.fail('Could not verify authenticator authentication response: verification failed')
      }
    } catch (error) {
      return Result.fail(`Could not verify authenticator authentication response: ${(error as Error).message}`)
    }

    authenticator.props.counter = verification.authenticationInfo.newCounter as number

    await this.authenticatorRepository.save(authenticator)

    return Result.ok(true)
  }
}
