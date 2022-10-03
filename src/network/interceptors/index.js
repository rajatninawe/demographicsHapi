//import store from "../../store";
//import { loader } from "../../store/Loader/LoaderAction";
//import Auth from "../../utils/Auth";
// import { AxiosRequestConfig } from "axios";

export const isHandlerEnabled = (config = { handlerEnabled: false }) => {
  return Object.prototype.hasOwnProperty.call(config, "handlerEnabled") &&
    !config.handlerEnabled
    ? false
    : true;
};

export const requestHandler = (request) => {
  return request;
};

export const successHandler = (response) => {
  if (isHandlerEnabled(response)) {
    // Hanlde Response
    //store.dispatch(loader(false));
  }
  return response;
};

export const errorHandler = (error) => {
  let errorMessage = "Something went wrong: ";
  //Add message in error
  if (error.isAxiosError) {
    if (isHandlerEnabled(error.config)) {
      //store.dispatch(loader(false));
      // You can decide what you need to do to handle errors.
      // here's example for unautherized user to log them out .
      // error.response.status === 401 && Auth.signOut();
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // unautherized logout if 401 response returned from api
            break;
          case 400:
            // bad request
            if (error.response.data && error.response.data.message) {
              errorMessage = errorMessage + error.response.data.message;
            }

            break;
          case 500:
            // bad request
            if (error.response.data && error.response.data.message) {
              errorMessage = errorMessage + error.response.data.message;
            }

            break;
          default:
            break;
        }

        // // client received an error response (5xx, 4xx)
        // if (error.response.data.startsWith(APP_EXCEPTION)) {
        //   const data = error.response.data;
        //   errorMessage = error.response.data
        //     .slice(
        //       data.indexOf(APP_EXCEPTION) + APP_EXCEPTION.length,
        //       data.indexOf('at') - 1,
        //     )
        //     .trim();
        // }
      } else if (error.request) {
        // client never received a response, or request never left
      } else {
        // anything else
      }
    }
  }
  return Promise.reject({ ...error, message: errorMessage });
};
