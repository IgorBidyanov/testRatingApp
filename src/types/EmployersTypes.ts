export type TDepartment = 'Отдел разработки' | 'Отдел маркетинга' | 'Отдел продаж' | 'Отдел качества' | 'Отдел поддержки' | ''

export interface IEmployer {
  date_of_birth: string;
  department: TDepartment;
  full_name: string;
  id: string;
  phone: string;
  rating: number;
  shortened_name: string;
}

export type IEmployerResponse = Omit<IEmployer, 'id' | 'shortened_name'>

export interface IEmployersResponse {
  [key: string]: IEmployerResponse
}

export interface IUpdateEmployersRatingPayload {
  [key: string]: number
}

export interface INewEmployer extends Omit<IEmployer, 'id' | 'full_name' | 'rating' | 'shortened_name'> {
  second_name: string
  first_name: string
  patronymic: string
  rating: string
}

export interface IUpdateEmployer {
  [key: string]: Partial<IEmployerResponse>
}

export interface IUpdateEmployerPayload {
  createdEmployer: Partial<IEmployerResponse>
  id: string
}
