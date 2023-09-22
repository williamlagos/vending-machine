import { baseApi as api } from './baseApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    get: build.query<GetApiResponse, GetApiArg>({
      query: () => ({ url: `/` })
    }),
    postAuth: build.mutation<PostAuthApiResponse, PostAuthApiArg>({
      query: queryArg => ({
        url: `/auth`,
        method: 'POST',
        body: queryArg.auth
      })
    }),
    getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
      query: () => ({ url: `/users` })
    }),
    postUsers: build.mutation<PostUsersApiResponse, PostUsersApiArg>({
      query: queryArg => ({
        url: `/users`,
        method: 'POST',
        body: queryArg.user
      })
    }),
    getUsersById: build.query<GetUsersByIdApiResponse, GetUsersByIdApiArg>({
      query: queryArg => ({ url: `/users/${queryArg.id}` })
    }),
    putUsersById: build.mutation<PutUsersByIdApiResponse, PutUsersByIdApiArg>({
      query: queryArg => ({
        url: `/users/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.user
      })
    }),
    deleteUsersById: build.mutation<
      DeleteUsersByIdApiResponse,
      DeleteUsersByIdApiArg
    >({
      query: queryArg => ({ url: `/users/${queryArg.id}`, method: 'DELETE' })
    }),
    postUsersByIdDeposit: build.mutation<
      PostUsersByIdDepositApiResponse,
      PostUsersByIdDepositApiArg
    >({
      query: queryArg => ({
        url: `/users/${queryArg.id}/deposit`,
        method: 'POST',
        body: queryArg.coins
      })
    }),
    postUsersByIdReset: build.mutation<
      PostUsersByIdResetApiResponse,
      PostUsersByIdResetApiArg
    >({
      query: queryArg => ({
        url: `/users/${queryArg.id}/reset`,
        method: 'POST'
      })
    }),
    getProducts: build.query<GetProductsApiResponse, GetProductsApiArg>({
      query: () => ({ url: `/products` })
    }),
    postProducts: build.mutation<PostProductsApiResponse, PostProductsApiArg>({
      query: queryArg => ({
        url: `/products`,
        method: 'POST',
        body: queryArg.product
      })
    }),
    getProductsById: build.query<
      GetProductsByIdApiResponse,
      GetProductsByIdApiArg
    >({
      query: queryArg => ({ url: `/products/${queryArg.id}` })
    }),
    putProductsById: build.mutation<
      PutProductsByIdApiResponse,
      PutProductsByIdApiArg
    >({
      query: queryArg => ({
        url: `/products/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.product
      })
    }),
    deleteProductsById: build.mutation<
      DeleteProductsByIdApiResponse,
      DeleteProductsByIdApiArg
    >({
      query: queryArg => ({
        url: `/products/${queryArg.id}`,
        method: 'DELETE'
      })
    }),
    postProductsByIdBuy: build.mutation<
      PostProductsByIdBuyApiResponse,
      PostProductsByIdBuyApiArg
    >({
      query: queryArg => ({
        url: `/products/${queryArg.id}/buy`,
        method: 'POST',
        body: queryArg.buy
      })
    })
  }),
  overrideExisting: false
})
export { injectedRtkApi as vendingApi }
export type GetApiResponse = unknown
export type GetApiArg = void | never
export type PostAuthApiResponse =
  /** status 200 Returns the access token in string format */ Token
export interface PostAuthApiArg {
  auth: Auth
}
export type GetUsersApiResponse = /** status 200 The list of the users */ User[]
export type GetUsersApiArg = void | never
export type PostUsersApiResponse = /** status 200 The created user. */ User
export interface PostUsersApiArg {
  user: User
}
export type GetUsersByIdApiResponse =
  /** status 200 The user response by id */ User
export interface GetUsersByIdApiArg {
  /** The user id */
  id: string
}
export type PutUsersByIdApiResponse =
  /** status 200 The user was updated */ User
export interface PutUsersByIdApiArg {
  /** The user id */
  id: string
  user: User
}
export type DeleteUsersByIdApiResponse = unknown
export interface DeleteUsersByIdApiArg {
  /** The user id */
  id: string
}
export type PostUsersByIdDepositApiResponse = unknown
export interface PostUsersByIdDepositApiArg {
  /** The user id */
  id: string
  coins: Coins
}
export type PostUsersByIdResetApiResponse = unknown
export interface PostUsersByIdResetApiArg {
  /** The user id */
  id: string
}
export type GetProductsApiResponse =
  /** status 200 The list of the products */ Product[]
export type GetProductsApiArg = void | never
export type PostProductsApiResponse =
  /** status 201 A new product has been created */ Product
export interface PostProductsApiArg {
  product: Product
}
export type GetProductsByIdApiResponse =
  /** status 200 The product response by id */ Product
export interface GetProductsByIdApiArg {
  /** The product id */
  id: string
}
export type PutProductsByIdApiResponse =
  /** status 200 The product was updated */ Product
export interface PutProductsByIdApiArg {
  /** The product id */
  id: string
  product: Product
}
export type DeleteProductsByIdApiResponse = unknown
export interface DeleteProductsByIdApiArg {
  /** The product id */
  id: string
}
export type PostProductsByIdBuyApiResponse =
  /** status 200 coins were discounted, and the product bought */ Purchase
export interface PostProductsByIdBuyApiArg {
  /** The user id */
  id: string
  buy: Buy
}
export interface Token {
  token: string
}
export interface Auth {
  username: string
  password: string
}
export interface User {
  id?: string
  username: string
  password: string
  products?: object[]
  deposit?: object
  role: 'BUYER' | 'SELLER'
}
export interface Coins {
  id?: string
  hundred: number
  fifty: number
  twenty: number
  ten: number
  five: number
  buyerId?: string
}
export interface Product {
  id?: string
  productName: string
  amountAvailable: number
  cost: number
  sellerId?: string
}
export interface Purchase {
  spent: object
  remained?: object
  product: object
}
export interface Buy {
  amount: number
}
export const {
  useGetQuery,
  usePostAuthMutation,
  useGetUsersQuery,
  usePostUsersMutation,
  useGetUsersByIdQuery,
  usePutUsersByIdMutation,
  useDeleteUsersByIdMutation,
  usePostUsersByIdDepositMutation,
  usePostUsersByIdResetMutation,
  useGetProductsQuery,
  usePostProductsMutation,
  useGetProductsByIdQuery,
  usePutProductsByIdMutation,
  useDeleteProductsByIdMutation,
  usePostProductsByIdBuyMutation
} = injectedRtkApi
