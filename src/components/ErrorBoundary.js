import React, { Component } from 'react'

export default class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
      }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {hasError:true}
    }
    componentDidCatch(error, errorInfo) {
        // can log to see what happed
        console.log(error, errorInfo);
      }

    render() {
        if (this.state.hasError) {
            // Can show our custom UI as fallback
            return <h1>Something went wrong.</h1>;
          }
          //return 
          return this.props.children; 
    }
}