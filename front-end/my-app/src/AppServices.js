import { BaseUrl } from "./config";

const fetchPostCall = ({ url, params }) => {
  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      throw error;
    });
};

const fetchgetCall = ({ url }) => {
  return fetch(url, {})
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      throw error;
    });
};

export const forgetPass = async ({ params }) => {
  try {
    let url = `${BaseUrl}/forgetPass`;
    let result = await fetchPostCall({ url: url, params });
    return result;
  } catch (err) {
    alert("err occured", err);
  }
};
export const login = async ({ params }) => {
  try {
    let url = `${BaseUrl}/login`;
    let result = await fetchPostCall({ url: url, params });
    return result;
  } catch (err) {
    alert("err occured", err);
  }
};

export const loginPass = async ({ params }) => {
  try {
    let url = `${BaseUrl}/login`;
    let result = await fetchPostCall({ url: url, params });
    return result;
  } catch (err) {
    alert("err occured", err);
  }
};

export const sort_TimeLine = async ({ by = "oldestFirst" }) => {
  try {
    let url = `${BaseUrl}/${by}`;
    let result = await fetchgetCall({ url: url });
    return result;
  } catch (err) {
    alert("err occured", err);
  }
};


export const all_uploads=async ({params})=>{
  try {
    let url = `${BaseUrl}/all_uploads`;
    let result = await fetchPostCall({ url: url, params });
    return result;
  } catch (err) {
    alert("err occured", err);
  }
}
