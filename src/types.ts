export interface User {
    avatar: string
    email: string
    first_name: string
    id: number
    last_name: string
}

export interface PaginationData {
    page: number
    perPage?: number
    total?: number
    totalPages?: number
}