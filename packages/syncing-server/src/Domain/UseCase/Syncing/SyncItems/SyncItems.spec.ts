import 'reflect-metadata'

import { ApiVersion } from '../../../Api/ApiVersion'
import { Item } from '../../../Item/Item'
import { ItemHash } from '../../../Item/ItemHash'
import { ItemServiceInterface } from '../../../Item/ItemServiceInterface'

import { SyncItems } from './SyncItems'
import { ContentType, Dates, Timestamps, UniqueEntityId, Uuid } from '@standardnotes/domain-core'

describe('SyncItems', () => {
  let itemService: ItemServiceInterface
  let item1: Item
  let item2: Item
  let item3: Item
  let itemHash: ItemHash

  const createUseCase = () => new SyncItems(itemService)

  beforeEach(() => {
    item1 = Item.create(
      {
        userUuid: Uuid.create('00000000-0000-0000-0000-000000000000').getValue(),
        updatedWithSession: null,
        content: 'foobar',
        contentType: ContentType.create(ContentType.TYPES.Note).getValue(),
        encItemKey: null,
        authHash: null,
        itemsKeyId: null,
        duplicateOf: null,
        deleted: false,
        dates: Dates.create(new Date(1616164633241311), new Date(1616164633241311)).getValue(),
        timestamps: Timestamps.create(1616164633241311, 1616164633241311).getValue(),
      },
      new UniqueEntityId('00000000-0000-0000-0000-000000000001'),
    ).getValue()
    item2 = Item.create(
      {
        userUuid: Uuid.create('00000000-0000-0000-0000-000000000000').getValue(),
        updatedWithSession: null,
        content: 'foobar',
        contentType: ContentType.create(ContentType.TYPES.Note).getValue(),
        encItemKey: null,
        authHash: null,
        itemsKeyId: null,
        duplicateOf: null,
        deleted: false,
        dates: Dates.create(new Date(1616164633241311), new Date(1616164633241311)).getValue(),
        timestamps: Timestamps.create(1616164633241311, 1616164633241311).getValue(),
      },
      new UniqueEntityId('00000000-0000-0000-0000-000000000002'),
    ).getValue()
    item3 = Item.create(
      {
        userUuid: Uuid.create('00000000-0000-0000-0000-000000000000').getValue(),
        updatedWithSession: null,
        content: 'foobar',
        contentType: ContentType.create(ContentType.TYPES.Note).getValue(),
        encItemKey: null,
        authHash: null,
        itemsKeyId: null,
        duplicateOf: null,
        deleted: false,
        dates: Dates.create(new Date(1616164633241311), new Date(1616164633241311)).getValue(),
        timestamps: Timestamps.create(1616164633241311, 1616164633241311).getValue(),
      },
      new UniqueEntityId('00000000-0000-0000-0000-000000000003'),
    ).getValue()

    itemHash = {
      uuid: '2-3-4',
      content: 'asdqwe',
      content_type: ContentType.TYPES.Note,
      duplicate_of: null,
      enc_item_key: 'qweqwe',
      items_key_id: 'asdasd',
      created_at: '2021-02-19T11:35:45.655Z',
      updated_at: '2021-03-25T09:37:37.944Z',
    }

    itemService = {} as jest.Mocked<ItemServiceInterface>
    itemService.getItems = jest.fn().mockReturnValue({
      items: [item1],
      cursorToken: 'asdzxc',
    })
    itemService.saveItems = jest.fn().mockReturnValue({
      savedItems: [item2],
      conflicts: [],
      syncToken: 'qwerty',
    })
    itemService.frontLoadKeysItemsToTop = jest.fn().mockReturnValue([item3, item1])
  })

  it('should sync items', async () => {
    const result = await createUseCase().execute({
      userUuid: '1-2-3',
      itemHashes: [itemHash],
      computeIntegrityHash: false,
      syncToken: 'foo',
      cursorToken: 'bar',
      limit: 10,
      readOnlyAccess: false,
      contentType: 'Note',
      apiVersion: ApiVersion.v20200115,
      sessionUuid: null,
      snjsVersion: '1.2.3',
    })
    expect(result.getValue()).toEqual({
      conflicts: [],
      cursorToken: 'asdzxc',
      retrievedItems: [item1],
      savedItems: [item2],
      syncToken: 'qwerty',
    })

    expect(itemService.frontLoadKeysItemsToTop).not.toHaveBeenCalled()
    expect(itemService.getItems).toHaveBeenCalledWith({
      contentType: 'Note',
      cursorToken: 'bar',
      limit: 10,
      syncToken: 'foo',
      userUuid: '1-2-3',
    })
    expect(itemService.saveItems).toHaveBeenCalledWith({
      itemHashes: [itemHash],
      userUuid: '1-2-3',
      apiVersion: '20200115',
      readOnlyAccess: false,
      sessionUuid: null,
    })
  })

  it('should sync items and return items keys on top for first sync', async () => {
    const result = await createUseCase().execute({
      userUuid: '1-2-3',
      itemHashes: [itemHash],
      computeIntegrityHash: false,
      limit: 10,
      readOnlyAccess: false,
      sessionUuid: '2-3-4',
      contentType: 'Note',
      apiVersion: ApiVersion.v20200115,
      snjsVersion: '1.2.3',
    })
    expect(result.getValue()).toEqual({
      conflicts: [],
      cursorToken: 'asdzxc',
      retrievedItems: [item3, item1],
      savedItems: [item2],
      syncToken: 'qwerty',
    })
  })

  it('should sync items and return filtered out sync conflicts for consecutive sync operations', async () => {
    itemService.getItems = jest.fn().mockReturnValue({
      items: [item1, item2],
      cursorToken: 'asdzxc',
    })

    itemService.saveItems = jest.fn().mockReturnValue({
      savedItems: [],
      conflicts: [
        {
          serverItem: item2,
          type: 'sync_conflict',
        },
        {
          serverItem: undefined,
          type: 'sync_conflict',
        },
      ],
      syncToken: 'qwerty',
    })

    const result = await createUseCase().execute({
      userUuid: '1-2-3',
      itemHashes: [itemHash],
      computeIntegrityHash: false,
      syncToken: 'foo',
      readOnlyAccess: false,
      sessionUuid: '2-3-4',
      cursorToken: 'bar',
      limit: 10,
      contentType: 'Note',
      apiVersion: ApiVersion.v20200115,
      snjsVersion: '1.2.3',
    })

    expect(result.getValue()).toEqual({
      conflicts: [
        {
          serverItem: item2,
          type: 'sync_conflict',
        },
        {
          serverItem: undefined,
          type: 'sync_conflict',
        },
      ],
      cursorToken: 'asdzxc',
      retrievedItems: [item1],
      savedItems: [],
      syncToken: 'qwerty',
    })
  })
})