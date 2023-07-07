const TYPES = {
  Sync_DBConnection: Symbol.for('Sync_DBConnection'),
  Sync_Logger: Symbol.for('Sync_Logger'),
  Sync_Redis: Symbol.for('Sync_Redis'),
  Sync_SNS: Symbol.for('Sync_SNS'),
  Sync_SQS: Symbol.for('Sync_SQS'),
  Sync_S3: Symbol.for('Sync_S3'),
  Sync_Env: Symbol.for('Sync_Env'),
  // Repositories
  Sync_ItemRepository: Symbol.for('Sync_ItemRepository'),
  // ORM
  Sync_ORMItemRepository: Symbol.for('Sync_ORMItemRepository'),
  // Middleware
  Sync_AuthMiddleware: Symbol.for('Sync_AuthMiddleware'),
  // Projectors
  Sync_ItemProjector: Symbol.for('Sync_ItemProjector'),
  Sync_SavedItemProjector: Symbol.for('Sync_SavedItemProjector'),
  Sync_ItemConflictProjector: Symbol.for('Sync_ItemConflictProjector'),
  // env vars
  Sync_REDIS_URL: Symbol.for('Sync_REDIS_URL'),
  Sync_SNS_TOPIC_ARN: Symbol.for('Sync_SNS_TOPIC_ARN'),
  Sync_SNS_AWS_REGION: Symbol.for('Sync_SNS_AWS_REGION'),
  Sync_SQS_QUEUE_URL: Symbol.for('Sync_SQS_QUEUE_URL'),
  Sync_SQS_AWS_REGION: Symbol.for('Sync_SQS_AWS_REGION'),
  Sync_AUTH_JWT_SECRET: Symbol.for('Sync_AUTH_JWT_SECRET'),
  Sync_EXTENSIONS_SERVER_URL: Symbol.for('Sync_EXTENSIONS_SERVER_URL'),
  Sync_AUTH_SERVER_URL: Symbol.for('Sync_AUTH_SERVER_URL'),
  Sync_S3_AWS_REGION: Symbol.for('Sync_S3_AWS_REGION'),
  Sync_S3_BACKUP_BUCKET_NAME: Symbol.for('Sync_S3_BACKUP_BUCKET_NAME'),
  Sync_EMAIL_ATTACHMENT_MAX_BYTE_SIZE: Symbol.for('Sync_EMAIL_ATTACHMENT_MAX_BYTE_SIZE'),
  Sync_REVISIONS_FREQUENCY: Symbol.for('Sync_REVISIONS_FREQUENCY'),
  Sync_NEW_RELIC_ENABLED: Symbol.for('Sync_NEW_RELIC_ENABLED'),
  Sync_VERSION: Symbol.for('Sync_VERSION'),
  Sync_CONTENT_SIZE_TRANSFER_LIMIT: Symbol.for('Sync_CONTENT_SIZE_TRANSFER_LIMIT'),
  Sync_MAX_ITEMS_LIMIT: Symbol.for('Sync_MAX_ITEMS_LIMIT'),
  Sync_FILE_UPLOAD_PATH: Symbol.for('Sync_FILE_UPLOAD_PATH'),
  // use cases
  Sync_SyncItems: Symbol.for('Sync_SyncItems'),
  Sync_CheckIntegrity: Symbol.for('Sync_CheckIntegrity'),
  Sync_GetItem: Symbol.for('Sync_GetItem'),
  Sync_GetSharedVaults: Symbol.for('Sync_GetSharedVaults'),
  Sync_CreateSharedVault: Symbol.for('Sync_CreateSharedVault'),
  Sync_DeleteSharedVault: Symbol.for('Sync_DeleteSharedVault'),
  Sync_CreateSharedVaultFileValetToken: Symbol.for('Sync_CreateSharedVaultFileValetToken'),
  Sync_GetSharedVaultUsers: Symbol.for('Sync_GetSharedVaultUsers'),
  Sync_RemoveSharedVaultUser: Symbol.for('Sync_RemoveSharedVaultUser'),
  Sync_InviteUserToSharedVault: Symbol.for('Sync_InviteUserToSharedVault'),
  Sync_UpdateSharedVaultInvite: Symbol.for('Sync_UpdateSharedVaultInvite'),
  Sync_AcceptInviteToSharedVault: Symbol.for('Sync_AcceptInviteToSharedVault'),
  Sync_DeclineInviteToSharedVault: Symbol.for('Sync_DeclineInviteToSharedVault'),
  Sync_DeleteSharedVaultInvitesToUser: Symbol.for('Sync_DeleteSharedVaultInvitesToUser'),
  Sync_DeleteSharedVaultInvitesSentByUser: Symbol.for('Sync_DeleteSharedVaultInvitesSentByUser'),
  Sync_GetSharedVaultInvitesSentByUser: Symbol.for('Sync_GetSharedVaultInvitesSentByUser'),
  Sync_GetSharedVaultInvitesSentToUser: Symbol.for('Sync_GetSharedVaultInvitesSentToUser'),
  Sync_SharedVaultInviteHttpMapper: Symbol.for('Sync_SharedVaultInviteHttpMapper'),
  // Handlers
  Sync_AccountDeletionRequestedEventHandler: Symbol.for('Sync_AccountDeletionRequestedEventHandler'),
  Sync_DuplicateItemSyncedEventHandler: Symbol.for('Sync_DuplicateItemSyncedEventHandler'),
  Sync_EmailBackupRequestedEventHandler: Symbol.for('Sync_EmailBackupRequestedEventHandler'),
  Sync_ItemRevisionCreationRequestedEventHandler: Symbol.for('Sync_ItemRevisionCreationRequestedEventHandler'),
  // Services
  Sync_ContentDecoder: Symbol.for('Sync_ContentDecoder'),
  Sync_DomainEventPublisher: Symbol.for('Sync_DomainEventPublisher'),
  Sync_DomainEventSubscriberFactory: Symbol.for('Sync_DomainEventSubscriberFactory'),
  Sync_DomainEventFactory: Symbol.for('Sync_DomainEventFactory'),
  Sync_DomainEventMessageHandler: Symbol.for('Sync_DomainEventMessageHandler'),
  Sync_HTTPClient: Symbol.for('Sync_HTTPClient'),
  Sync_ItemService: Symbol.for('Sync_ItemService'),
  Sync_Timer: Symbol.for('Sync_Timer'),
  Sync_SyncResponseFactory20161215: Symbol.for('Sync_SyncResponseFactory20161215'),
  Sync_SyncResponseFactory20200115: Symbol.for('Sync_SyncResponseFactory20200115'),
  Sync_SyncResponseFactoryResolver: Symbol.for('Sync_SyncResponseFactoryResolver'),
  Sync_AuthHttpService: Symbol.for('Sync_AuthHttpService'),
  Sync_ExtensionsHttpService: Symbol.for('Sync_ExtensionsHttpService'),
  Sync_ItemBackupService: Symbol.for('Sync_ItemBackupService'),
  Sync_ItemSaveValidator: Symbol.for('Sync_ItemSaveValidator'),
  Sync_OwnershipFilter: Symbol.for('Sync_OwnershipFilter'),
  Sync_TimeDifferenceFilter: Symbol.for('Sync_TimeDifferenceFilter'),
  Sync_UuidFilter: Symbol.for('Sync_UuidFilter'),
  Sync_ContentTypeFilter: Symbol.for('Sync_ContentTypeFilter'),
  Sync_ContentFilter: Symbol.for('Sync_ContentFilter'),
  Sync_ItemFactory: Symbol.for('Sync_ItemFactory'),
  Sync_ItemTransferCalculator: Symbol.for('Sync_ItemTransferCalculator'),
  Sync_ControllerContainer: Symbol.for('Sync_ControllerContainer'),
  Sync_HomeServerItemsController: Symbol.for('Sync_HomeServerItemsController'),
  // Mapping
  Sync_SharedVaultHttpMapper: Symbol.for('Sync_SharedVaultHttpMapper'),
  Sync_SharedVaultUserHttpMapper: Symbol.for('Sync_SharedVaultUserHttpMapper'),
}

export default TYPES
