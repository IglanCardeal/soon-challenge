import { IsNotEmpty, IsString } from 'class-validator'

export class FindParamsDTO {
  @IsString()
  @IsNotEmpty()
  id: string
}
