export class QueryClient {
    private apiUrl: string;

    constructor(){
        const url = process.env.NEXT_PUBLIC_API_URL;
        if(!url){
            throw new Error('API URL NOT PRESENT')
        }
        this.apiUrl = url;
    }

    async query(query: string) {
        try {
            const request = await fetch(this.apiUrl, {
                method: 'POST',
                body: JSON.stringify({query}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const response = await request.json();
            return response;
        } catch (error: any) {
            throw new Error('Error while querying: ', error.message);
        }
    }
}