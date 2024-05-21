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
  async (id: string) => {
    try {
      const res: Record<string, IEmployer> = await $host.get(
        `employers.json?orderBy="$key"&equalTo="${id}"`
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
  async (newEmployer: IEmployerResponse) => {
    try {
      const res = await $host.post(
      `employers.json`, newEmployer
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
  async (payload: IUpdateEmployersRatingPayload) => {
    try {
      const res = await $host.patch(
        `employers.json`, payload
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
  async (payload: IUpdateEmployerPayload) => {
    const { createdEmployer, id } = payload
    try {
      const res = await $host.patch(
        `employers/${id}.json`, createdEmployer
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
  async (id: string) => {
    try {
      const res = await $host.delete(
        `employers/${id}.json`
      ).then(result => result.data)
      return res
    }
    catch (error) {
      throw new AxiosError('Не удалось удалить данные')
    }
  }
)