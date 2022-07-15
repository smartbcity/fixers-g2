import { useCallback } from 'react'
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from 'react-query'
import { request } from '@smartb/g2-utils'
import {
  DirectoryPath,
  FileDeleteCommand,
  FileDeletedEvent,
  FileGetListCommand,
  FileUploadCommand,
  FileUploadedEvent,
  FsFile,
  TrackedFsFile
} from '../Domain'

export interface GetGalleryResult {
  items: FsFile[]
}

export type GetGalleryOptions =
  | Omit<
      UseQueryOptions<
        GetGalleryResult | undefined,
        unknown,
        GetGalleryResult | undefined,
        string[]
      >,
      'queryKey' | 'queryFn'
    >
  | undefined

export interface getGalleryParams {
  directoryPath: DirectoryPath
  /**
   * @default "gallery"
   */
  queryKey?: string
  jwt?: string
  apiUrl: string
  options?: GetGalleryOptions
}

export const useGetGallery = (params: getGalleryParams) => {
  const { apiUrl, jwt, options, directoryPath, queryKey = 'gallery' } = params

  const getGallery = useCallback(async () => {
    const res = await request<GetGalleryResult[]>({
      url: `${apiUrl}/fileList`,
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

  return useQuery([queryKey, directoryPath], getGallery, options)
}

export type DeleteFilesOptions = Omit<
  UseMutationOptions<
    FileDeletedEvent[] | undefined,
    unknown,
    FileDeleteCommand[],
    unknown
  >,
  'mutationFn'
>

export interface deleteFilesParams {
  jwt?: string
  apiUrl: string
  options?: DeleteFilesOptions
}

export const useDeleteFiles = (params: deleteFilesParams) => {
  const { apiUrl, jwt, options } = params

  const deleteFile = useCallback(
    async (commands: FileDeleteCommand[]) => {
      const res = await request<FileDeletedEvent[]>({
        url: `${apiUrl}/fileDelete`,
        method: 'POST',
        body: JSON.stringify(commands),
        jwt: jwt
      })

      return res || undefined
    },
    [apiUrl, jwt]
  )

  return useMutation(deleteFile, options)
}

export type UploadFilesOptions = Omit<
  UseMutationOptions<
    FileUploadedEvent[] | undefined,
    unknown,
    TrackedFsFile[],
    unknown
  >,
  'mutationFn'
>

export interface uploadFilesParams {
  jwt?: string
  apiUrl: string
  options?: UploadFilesOptions
}

export const useUploadFiles = (params: uploadFilesParams) => {
  const { apiUrl, jwt, options } = params

  const uploadFiles = useCallback(
    async (files: TrackedFsFile[]) => {
      const formData = new FormData()
      const commands: Record<string, FileUploadCommand> = {}
      files.forEach((file) => {
        formData.append('file', file.file!, file.path.name)
        commands[file.path.name] = {
          path: file.path,
          metadata: {}
        }
      })
      formData.append(
        'command',
        new Blob([JSON.stringify(commands)], { type: 'application/json' })
      )

      const res = await request<FileUploadedEvent[]>({
        url: `${apiUrl}/fileUploads`,
        method: 'POST',
        formData: formData,
        jwt: jwt
      })
      return res || undefined
    },
    [jwt, apiUrl]
  )

  return useMutation(uploadFiles, options)
}
