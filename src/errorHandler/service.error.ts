class ServiceError extends Error {
  constructor(msg: string) {
    super();
    this.message = "service: " + msg;
  }
}
export default ServiceError;
