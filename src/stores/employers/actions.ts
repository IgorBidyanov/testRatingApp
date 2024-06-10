import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios"; 
import { $host } from "api";
import { IEmployer, IEmployerResponse, IEmployersResponse, IUpdateEmployerPayload, IUpdateEmployersRatingPayload } from "types/EmployersTypes";

export const getEmployersAction = createAsyncThunk(
  'employers/getEmployersAction',
  async () => {
    try {
      const res: IEmployersResponse = await $host.get(
        'employers.json'
      ).then(result => {
        return result.data
      })
      return res
    }
    catch (error) {
      throw new AxiosError('Не удалось получить список работников')
    }
  }
)

export const getEmployerAction = createAsyncThunk(
  'employers/getEmployerAction',
  async ({id, token}: {id: string, token: string}) => {
    try {
      const res: Record<string, IEmployer> = await $host.get(
        `employers.json?auth=${token}&orderBy="$key"&equalTo="${id}"`
      ).then(result => {
        return result.data
      })
      return res
    }
    catch (error) {
      throw new AxiosError('Не удалось получить данные работника')
    }
  }
)

export const addNewEmployerAction = createAsyncThunk(
  'employers/addNewEmployerAction',
  async ({newEmployer, token}: {newEmployer: IEmployerResponse, token: string}) => {
    try {
      const res = await $host.post(
      `employers.json?auth=${token}`, newEmployer
      ).then(result => {
        return result.data
      })
      return res
    }
    catch (error) {
      throw new AxiosError('Не удалось добавить сотрудника')
    }
  }
)

export const updateEmployersRatingAction = createAsyncThunk(
  'employers/updateEmployersRatingAction',
  async ({payload, token}: {payload: IUpdateEmployersRatingPayload, token: string}) => {
    try {
      const res = await $host.patch(
        `employers.json?auth=${token}`, payload
      ).then(result => {
        return result.data
      })
      return res
    }
    catch (error) {
      throw new AxiosError('Не удалось обновить данные')
    }
  }
)

export const updateEmployerAction = createAsyncThunk(
  'employers/updateEmployerAction',
  async ({payload, token}: {payload: IUpdateEmployerPayload, token: string}) => {
    const { createdEmployer, id } = payload
    try {
      const res = await $host.patch(
        `employers/${id}.json?auth=${token}`, createdEmployer
      ).then(result => {
        return result.data
      })
      return res
    }
    catch (error) {
      throw new AxiosError('Не удалось обновить данные')
    }
  }
)

export const deleteEmployerAction = createAsyncThunk(
  'employer/deleteEmployerAction',
  async ({id, token}: {id: string, token: string}) => {
    try {
      const res = await $host.delete(
        `employers/${id}.json?auth=${token}`
      ).then(result => result.data)
      return res
    }
    catch (error) {
      throw new AxiosError('Не удалось удалить данные')
    }
  }
)