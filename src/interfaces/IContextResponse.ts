interface IContextResponse {
  user:
    | { id: string; name: string; username: string; password: string }
    | undefined;
  controllers: {
    user: any;
    continent: any;
  };
}
export default IContextResponse;
