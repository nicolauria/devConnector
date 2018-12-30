import axios from 'axios';
import { GET_PROFILE,
         GET_PROFILES,
         PROFILE_LOADING,
         CLEAR_CURRENT_PROFILE,
         GET_ERRORS,
         SET_CURRENT_USER } from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: {}
    }));
}

// Get current profile
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`/api/profile/handle/${handle}`)
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: null
    }));
}

export const getProfileById = userId => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`/api/profile/user/${userId}`)
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: null
    }));
}

// Create/Edit profile
export const createProfile = (profileData, history) => dispatch => {
  axios.post('/api/profile', profileData)
    .then(res => {
      history.push('/dashboard')
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// Add experience
export const addExperience = (experience, history) => dispatch => {
  axios.post('/api/profile/experience', experience)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// Add education
export const addEducation = (education, history) => dispatch => {
  axios.post('/api/profile/education', education)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// Delete Account and Profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This cannot be undone.')) {
    axios.delete('/api/profile')
      .then(res => dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      }))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
  }
}

// Delete experience
export const deleteExperience = (id) => dispatch => {
  axios.delete(`/api/profile/experience/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// Delete education
export const deleteEducation = (id) => dispatch => {
  axios.delete(`/api/profile/education/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile/all')
    .then(profiles => dispatch({
      type: GET_PROFILES,
      payload: profiles.data
    }))
    .catch(err => dispatch({
      type: GET_PROFILES,
      payload: null
    }))
}

// Profile loading
export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

// Clear profile
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});
