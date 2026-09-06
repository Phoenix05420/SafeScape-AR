import React from 'react';

export const LoadingSpinner = ({ message = 'Loading...' }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mb-4"></div>
    <p className="text-slate-500 text-sm">{message}</p>
  </div>
);

export default LoadingSpinner;
