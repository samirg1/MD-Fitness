import axios from "./axios";

/**
 * Get data from GraphQL server using axios.
 * @param query The GraphQl query to execute.
 * @param onSuccess The callback function to be called if the request is successful.
 * @param signal The signal to abort the get if necessary.
 * @returns String detailing the error (if any).
 */
export const graphQLRequest = async <T>(
    query: string,
    onSuccess: (data: T) => void = () => {},
    signal?: AbortSignal
): Promise<string | null> => {
    try {
        const response = await axios("", {
            method: "POST",
            signal: signal,
            data: { query: query },
        });
        if (!response?.data?.data) return "Response data not found";
        if (response.data.errors) return response.data.errors[0].message;
        onSuccess(response.data.data);
    } catch (error: any) {
        if (error.code !== "ERR_CANCELED") return error.message; // don't fail if call is cancelled
    }
    return null;
};
