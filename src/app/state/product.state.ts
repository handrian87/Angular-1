export enum ProductActionsTypes {
  GET_ALL_PRODUCTS = "[Product] Get All products",
  GET_SELECTED_PRODUCTS = "[Product] Get Selected products",
  GET_AVAILABLE_PRODUCTS = "[Product] Get Available products",
  SEARCH_PRODUCTS = "[Product] Search products",
  NEW_PRODUCT = "[Product] New product",
  SELECT_PRODUCT = "[Product] Select product",
  EDIT_PRODUCT = "[Product] Edit product",
  DELETE_PRODUCT = "[Product] Delete product"
}

export interface ActionEvent {
  // Un Event contient 2 attributs:
  // type et paramètres
  type: ProductActionsTypes,
  payload?: any
}

export enum DataSateEnum {
  LOADING,
  LOADED,
  ERROR
}

export interface AppDataState<T> {
  // dataState peut être LOADING-LOADED-ERROR
  dataState?:DataSateEnum,
  // ? pour dire que sa présence dans l'objet est facultative
  data?:T,
  errorMessage?:string
}
