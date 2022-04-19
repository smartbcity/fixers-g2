import { useCallback } from 'react'
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from 'react-query'
import { request } from 'utils'
import {
  DirectoryPath,
  FileDeleteCommand,
  FileDeletedEvent,
  FileGetListCommand,
  FileUploadCommand,
  FileUploadedEvent,
  FsFile
} from './types'

export interface getGalleryParams {
  directoryPath: DirectoryPath
  queryId?: string
  jwt?: string
  apiUrl: string
  options?: Omit<
    UseQueryOptions<
      { files: FsFile[] } | undefined,
      unknown,
      { files: FsFile[] } | undefined,
      'gallery'
    >,
    'queryKey' | 'queryFn'
  >
}

export const useGetGallery = (params: getGalleryParams) => {
  const { apiUrl, jwt, options, directoryPath, queryId = 'gallery' } = params

  const getGallery = useCallback(async () => {
    const res = await request<{ files: FsFile[] }[]>({
      url: `${apiUrl}/listFiles`,
      method: 'POST',
      body: JSON.stringify(directoryPath as FileGetListCommand),
      jwt: jwt
    })
    if (res) {
      return res[0]
    } else {
      return undefined
    }
  }, [apiUrl, jwt, directoryPath])

  return useQuery(queryId, getGallery, options)
}

export interface deleteFilesParams {
  jwt?: string
  apiUrl: string
  options?: Omit<
    UseMutationOptions<{}[] | undefined, unknown, FileDeleteCommand[], unknown>,
    'mutationFn'
  >
}

export const useDeleteFiles = (params: deleteFilesParams) => {
  const { apiUrl, jwt, options } = params

  const deleteFile = useCallback(
    async (commands: FileDeleteCommand[]) => {
      const res = await request<FileDeletedEvent[]>({
        url: `${apiUrl}/deleteFile`,
        method: 'POST',
        body: JSON.stringify(commands),
        jwt: jwt
      })
      if (res) {
        return res
      } else {
        return undefined
      }
    },
    [apiUrl, jwt]
  )

  return useMutation(deleteFile, options)
}

export interface uploadFilesParams {
  jwt?: string
  apiUrl: string
  options?: Omit<
    UseMutationOptions<{}[] | undefined, unknown, FileUploadCommand[], unknown>,
    'mutationFn'
  >
}

export const useUploadFiles = (params: uploadFilesParams) => {
  const { apiUrl, jwt, options } = params

  const uploadFile = useCallback(
    async (commands: FileUploadCommand[]) => {
      const res = await request<FileUploadedEvent[]>({
        url: `${apiUrl}/uploadFile`,
        method: 'POST',
        body: JSON.stringify(commands),
        jwt: jwt
      })
      if (res) {
        return res
      } else {
        return undefined
      }
    },
    [apiUrl, jwt]
  )

  return useMutation(uploadFile, options)
}
