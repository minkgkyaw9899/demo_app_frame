export type PostObj = {
  id: string
  title: string
  body: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export type PostCreateObj = {
  title: string,
  body: string
}