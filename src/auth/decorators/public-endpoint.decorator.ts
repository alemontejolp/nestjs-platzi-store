import { SetMetadata } from "@nestjs/common"

export const IS_PUBLIC_ENDPOINT_DECOR_KEY = 'is-public-endpoint'

export const PublicEndpoint = () => SetMetadata(IS_PUBLIC_ENDPOINT_DECOR_KEY, true)
