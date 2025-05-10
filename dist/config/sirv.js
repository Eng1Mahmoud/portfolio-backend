import axios from "axios";
// Initialize config object
const sirvConfig = {
    clientId: process.env.SIRV_CLIENT_ID || "",
    clientSecret: process.env.SIRV_CLIENT_SECRET || "",
    baseUrl: "api.sirv.com",
    uploadPath: "/v2/files/upload",
    tokenPath: "/v2/token",
    domain: process.env.SIRV_DOMAIN || "",
};
let currentToken = null;
// Utility function to handle HTTP requests
const makeRequest = async (options, payload) => {
    try {
        const { method, hostname, path, headers } = options;
        const url = `https://${hostname}${path}`;
        const response = await axios({
            method,
            url,
            headers,
            data: payload,
            responseType: "arraybuffer"
        });
        return response.data instanceof Buffer ? response.data.toString() : response.data;
    }
    catch (error) {
        if (error.response) {
            throw new Error(`Request failed with status ${error.response.status}: ${error.response.data}`);
        }
        throw error;
    }
};
// Function to get a token
const getToken = async () => {
    if (!process.env.SIRV_CLIENT_ID || !process.env.SIRV_CLIENT_SECRET) {
        throw new Error("Missing required Sirv environment variables (SIRV_CLIENT_ID, SIRV_CLIENT_SECRET)");
    }
    const options = {
        method: "POST",
        hostname: sirvConfig.baseUrl,
        path: sirvConfig.tokenPath,
        headers: { "content-type": "application/json" },
    };
    const payload = {
        clientId: process.env.SIRV_CLIENT_ID,
        clientSecret: process.env.SIRV_CLIENT_SECRET,
    };
    const body = await makeRequest(options, payload);
    const response = JSON.parse(body);
    currentToken = response.token;
    return currentToken;
};
// Function to upload a file to Sirv
export const uploadToSirv = async (buffer, filename) => {
    if (!process.env.SIRV_DOMAIN) {
        throw new Error("Missing required Sirv environment variable (SIRV_DOMAIN)");
    }
    const token = await getToken();
    const options = {
        method: "POST",
        hostname: sirvConfig.baseUrl,
        path: `${sirvConfig.uploadPath}?filename=${encodeURIComponent(`/portfolio/${filename}`)}`,
        headers: {
            "content-type": "application/octet-stream",
            authorization: `Bearer ${token}`,
            "content-length": buffer.length,
        },
    };
    await makeRequest(options, buffer);
    return `https://${process.env.SIRV_DOMAIN}/portfolio/${filename}`;
};
