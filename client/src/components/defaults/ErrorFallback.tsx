import DefaultPage from "./DefaultPage";

const ErrorFallback = ({
    error,
    resetErrorBoundary,
}: {
    error: any;
    resetErrorBoundary: (...args: any[]) => void;
}) => <DefaultPage displayText={`Something went wrong: ${error.message}`} />;

export default ErrorFallback;
