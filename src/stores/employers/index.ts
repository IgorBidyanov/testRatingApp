import { createSlice } from "@reduxjs/toolkit"
import { addNewEmployerAction, deleteEmployerAction, getEmployerAction, getEmployersAction, updateEmployerAction, updateEmployersRatingAction } from "./actions"
import { IEmployer } from "types/EmployersTypes"

interface IAuthStore {
  employers: IEmployer[] | null,
  employer: IEmployer | null,
  isLoading: boolean
  error: string | undefined
}

const initialState: IAuthStore = {
  employers: null,
  employer: null,
  isLoading: false,
  error: ''
}

export const employersSlice = createSlice({
  name: 'employers',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    // ========= GET EMPLOYERS ========== //
    builder.addCase(getEmployersAction.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getEmployersAction.fulfilled, (state, action) => {
      if (action.payload) {
        const employersTmp = action.payload
        const employers = Object.keys(employersTmp).map(id => {
          const parts = employersTmp[id].full_name.split(' ')
          const lastName = parts[0]
          const initials = parts[1].charAt(0) + '.' + parts[2].charAt(0) + '.'
          const shortenedName = lastName + ' ' + initials
          const date = employersTmp[id].date_of_birth.split('-').reverse().join('.')
          return { ...employersTmp[id], shortened_name: shortenedName, id, date_of_birth: date }
        }).sort((a, b) => a.rating - b.rating)
        state.employers = employers
      }
      state.isLoading = false
    })
    builder.addCase(getEmployersAction.rejected, (state) => {
      state.employers = null
      state.isLoading = false
    })

    // ========= GET EMPLOYER ========== //
    builder.addCase(getEmployerAction.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getEmployerAction.fulfilled, (state, action) => {
      const employerTmp = { ...action.payload }
      let choosenEmployer
      for (let key in employerTmp) {
        choosenEmployer = {  ...employerTmp[key], id: key }
      }
      state.employer = choosenEmployer || null
      state.isLoading = false
    })
    builder.addCase(getEmployerAction.rejected, (state) => {
      state.employer = null
      state.isLoading = false
    })

      // ========= ADD EMPLOYER ========== //
    builder.addCase(addNewEmployerAction.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addNewEmployerAction.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(addNewEmployerAction.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

      // ========= UPDATE EMPLOYERS ========== //
    builder.addCase(updateEmployersRatingAction.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateEmployersRatingAction.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(updateEmployersRatingAction.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

      // ========= UPDATE EMPLOYER ========== //
    builder.addCase(updateEmployerAction.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateEmployerAction.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(updateEmployerAction.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

      // ========= DELETE EMPLOYER ========== //
    builder.addCase(deleteEmployerAction.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteEmployerAction.fulfilled, (state) => {
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(deleteEmployerAction.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },
})

// export const { } = employersSlice.actions

export default employersSlice.reducer