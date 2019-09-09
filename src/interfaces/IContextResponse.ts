interface IContextResponse {
  user:
    | { id: string; name: string; username: string; password: string }
    | undefined;
  controllers: {
    user: any;
    continent: any;
    language: any;
    country: any;
    actor: any;
  };
}
export default IContextResponse;
