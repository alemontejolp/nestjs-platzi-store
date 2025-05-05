import { IsOptional, IsPositive, Min, ValidateIf } from "class-validator"

export class GetProductListRequestMessage {
  @ValidateIf(dto => dto.limit != undefined)
  @Min(0)
  readonly page?: number

  @ValidateIf(dto => dto.page != undefined)
  @IsPositive()
  readonly limit?: number

  @ValidateIf(dto => dto.maxPrice != undefined)
  @Min(0)
  readonly minPrice?: number

  @ValidateIf(dto => dto.minPrice != undefined)
  @Min(0)
  readonly maxPrice?: number
}
