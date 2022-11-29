import React from "react"
import { Alert, Button, Container } from "react-bootstrap"
import Footer from "../components/Footer"
import Header from "../components/Header"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="d-flex flex-column justify-content-between h-100 ab">
          <Header activeKey={""} />
          <div className="mb-auto pb-4 pt-4">
            <Container>
              <Alert variant="danger text-center">Um Erro Grave Ocorreu! :/</Alert>
              <div className="d-flex justify-content-center">
                <Button 
                  onClick={() => this.setState({ hasError: false })} 
                  variant="danger"
                >Voltar</Button>
              </div>
            </Container>
          </div>
          <Footer />
        </div>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default ErrorBoundary