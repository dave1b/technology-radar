export interface Technology {
    id?: string;
    name?: string;
    category?: string;
    status?: string;
    description?: string;
    statusDescription?: string;
    author?: string;
    created?: string;
    published?: boolean;
    history?: [Change];
}

export interface Change {
    author: string;
    created: string;
}