export interface ingredient {
  id: number,
  name: string,
  largeCategory: string,
  expirationDate: string | any,
  smallCategory: string,
  weight: any
}
export interface recipe {
  id: number,
  name: string,
  image: string,
  type: string,
  weight: number
}