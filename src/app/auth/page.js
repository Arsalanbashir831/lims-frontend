import AuthForm from '@/components/shared/AuthForm';
import React from 'react';

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* <header className="p-4 shadow-md bg-white">
        <div className="flex items-center justify-between">
          <img
            src="/gripco_logo.svg" // Replace with your logo URL or file path
            alt="Logo"
            className="h-10 w-auto"
          />
          <h1 className="text-lg font-semibold text-gray-700">Welcome to GripCo</h1>
        </div>
      </header> */}
   
      <main className="flex-1 flex items-center justify-center">
          <AuthForm />
      
      </main>
      <footer className="p-4 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} GripCo. All rights reserved.
      </footer>
    </div>
  );
};

export default Page;