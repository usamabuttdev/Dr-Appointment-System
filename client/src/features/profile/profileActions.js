import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.withCredentials = true;

// create profile
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        REACT_APP_API_URL + `/api/v1/create-profile`,
        formData,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// update profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        REACT_APP_API_URL + `/api/v1/my-profile`,
        formData,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// get my  profile
export const myProfile = createAsyncThunk("profile/myProfile", async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.get(
      REACT_APP_API_URL + `/api/v1/my-profile`,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return error.response.data.message;
    } else {
      return error.message;
    }
  }
});

// delete my profile
export const deleteProfile = createAsyncThunk(
  "profile/deleteProfile",
  async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.delete(REACT_APP_API_URL + `/api/v1/my-profile`, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

//get all profiles -- admin
export const getAllProfiles = createAsyncThunk(
  "profile/getAllProfiles",
  async ({ currentPage, keyword }) => {
    try {
      let link;
      if (keyword === "") {
        link = REACT_APP_API_URL + `/api/v1/all-profiles?page=${currentPage}`;
      } else {
        link =
          REACT_APP_API_URL +
          `/api/v1/all-profiles?page=${currentPage}&keyword=${keyword}`;
      }

      const { data } = await axios.get(link, { withCredentials: true });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

//get all profiles user
export const getAllProfilesUser = createAsyncThunk(
  "profile/getAllProfilesUser",
  async ({ currentPage, keyword }) => {
    try {
      let link;
      if (keyword === "") {
        link =
          REACT_APP_API_URL + `/api/v1/all-profiles-user?page=${currentPage}`;
      } else {
        link =
          REACT_APP_API_URL +
          `/api/v1/all-profiles-user?page=${currentPage}&keyword=${keyword}`;
      }

      const { data } = await axios.get(link, { withCredentials: true });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

//get  profile by id
export const getSingleProfile = createAsyncThunk(
  "profile/getSingleProfile",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        REACT_APP_API_URL + `/api/v1/single-profile/${id}`,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//create profile  review
export const addReview = createAsyncThunk(
  "review/addReview",
  async ({ profileId, comment }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        REACT_APP_API_URL + `/api/v1/create-profile-review`,
        {
          profileId,
          comment,
        },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// delete profile review
export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async ({ _id, doctorId }) => {
    try {
      const { data } = await axios.delete(
        REACT_APP_API_URL +
          `/api/v1/profile-reviews?id=${_id}&profileId=${doctorId}`
      );
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

// update profile status ----admin
export const updateProfileStatus = createAsyncThunk(
  "profile/updateProfileStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        REACT_APP_API_URL + `/api/v1/update-profile-status/${id}`,
        { status },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// admin ----- get all  profiles stats

export const getAdminProfilesStats = createAsyncThunk(
  "profile/getAdminProfilesStats",
  async () => {
    try {
      let link = REACT_APP_API_URL + `/api/v1/all-profiles-admin`;

      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

// add education
export const addEducation = createAsyncThunk(
  "profile/addEducation",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        REACT_APP_API_URL + `/api/v1/education`,
        formData,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// add experiece
export const addExperience = createAsyncThunk(
  "profile/addExperience",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        REACT_APP_API_URL + `/api/v1/experience`,
        formData,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// delete education
export const deleteEducation = createAsyncThunk(
  "profile/deleteEducation",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.delete(
        REACT_APP_API_URL + `/api/v1/education/${id}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// delete experience
export const deleteExperience = createAsyncThunk(
  "profile/deleteExperience",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.delete(
        REACT_APP_API_URL + `/api/v1/experience/${id}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
