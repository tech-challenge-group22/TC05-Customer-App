export default interface IQueueService {
  receiveMessage(): any;
  messageID(): number;
}
