

export const ADD_USER_TYPE = 'USER_TYPE';
export const REMOVE_USER='REMOVE_USER';
export const LOADER_ON='LOADER_ON';
export const LOADER_OFF='LOADER_OFF';
export const ADD_USER='ADD_USER';
export const ADD_AD='ADD_AD'



export const addAd=(payload)=> {
  return {
    type: ADD_AD,
    payload:payload
  };
}
export const addUser=(userType)=> {
  return {
    type: ADD_USER_TYPE,
    payload:userType
  };
}
export const createUser=(user)=> {
  return {
    type: ADD_USER,
    payload:user
  };
}


export const removeUser =()=> {
    return {
      type: REMOVE_USER,
    };
  }
  export const loaderOn =()=> {
    return {
      type: LOADER_ON,
    };
  }
  export const loaderOff =()=> {
    return {
      type: LOADER_OFF,
    };
  }
