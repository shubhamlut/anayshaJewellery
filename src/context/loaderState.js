import {  useState } from "react";
import LoaderContext from "./loaderContext";

const LoaderState = (props) => {

    const [loader,setLoader] = useState(true)

    const closeLoader = ()=>{
        setLoader(false)
    }
  return (
  <LoaderContext.Provider value ={{loader,closeLoader}}>
    {props.children}
  </LoaderContext.Provider>);
};


export default LoaderState