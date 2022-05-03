export interface DirectoryPath {
  // ex: "project/a380a8fc-f471-461f-83aa-f296d0ea042d/gallery1/"
  objectType: string // ex: "project"
  objectId: string // ex: "a380a8fc-f471-461f-83aa-f296d0ea042d"
  directory: string // ex: "gallery1"
}

export interface FilePath extends DirectoryPath {
  // ex: "project/a380a8fc-f471-461f-83aa-f296d0ea042d/gallery1/banana.jpg"
  name: string // ex: "banana.jpg"
}

export interface FsFile {
  id: string
  path: FilePath
  url: string
  metadata: Record<string, string>
}

export interface FileUploadCommand {
  path: FilePath
  metadata: Record<string, string>
  content: string
}

export interface FileDeleteCommand extends FilePath {}

export interface FileGetListCommand extends DirectoryPath {}

export interface FileUploadedEvent {
  id: string
  url: string
  hash: string
  path: FilePath
  metadata: Record<string, string>
  time: number
}

export interface FileDeletedEvent {
  id: string
  path: FilePath
}

export type TrackedFsFile = FsFile & {
  isNew?: boolean
}
