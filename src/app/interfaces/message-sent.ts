export interface MessageSent {
    id: number;
    toUsername: string;
    subject: string;
    body: string;
    dateCreated: string;
    lastUpdated: string;
    fromUserId: number;
}