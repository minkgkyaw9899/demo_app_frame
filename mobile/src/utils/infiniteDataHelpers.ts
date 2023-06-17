import {InfiniteData} from '@tanstack/react-query'

type InfiniteDataResponse<T = unknown> = {
  data: T
  pagination: {
    currentPage: number
    totalPages: number
    nextPage: number | null
  }
}
export const extractDataFromInfinitePages = <T>(
  dataArr: InfiniteData<InfiniteDataResponse<T[]>> | undefined,
): T[] | [] => dataArr?.pages.flatMap(res => res.data) || []
