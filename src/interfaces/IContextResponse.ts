interface IContextResponse {
  user:
    | { id: string; name: string; username: string; password: string }
    | undefined;
  controllers: {
    user: any;
  };
}
export default IContextResponse;
