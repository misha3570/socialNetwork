import React, {Component} from "react";


export const withSuspense = (Component) => {
  return (props) => {
    return <React.Suspense fallback={<div>loading...<div>}>
    <Component />
      </React.Suspense>
  }
}