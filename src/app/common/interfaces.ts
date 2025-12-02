export interface ApiResponseJuguetesByPage {
  juguetes: JuguetesData
}

export interface JuguetesData {
  info: Info
  juguetes: Juguete[]
}

export interface Info {
  total: number
  pages: number
}

export interface Juguete {
  _id: string
  nombre: string
  imagen: string
  categoria: string
  edadMinima: number
  precio: number
}

export interface ApiResponseDeleteJuguete {
  message: string
}

export interface Toast{
  text: string;
  className: string;
}



