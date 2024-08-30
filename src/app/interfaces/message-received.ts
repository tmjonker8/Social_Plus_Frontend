export interface MessageReceived {
    
    id: number;
    toUsername: string;
    fromUsername: string;
    subject: string;
    body: string;
    dateCreated: string;
    lastUpdated: string;
    hasBeenRead: boolean;
}