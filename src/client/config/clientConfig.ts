// Define the interface for the API configuration for better type safety
interface ClientConfig {
    baseUrl: string;
}

const config: ClientConfig = {
    baseUrl: 'https://pusher.eywa.fi'
};

export default config;
export {ClientConfig}