import AuthForm from '@/components/shared/AuthForm';
import React from 'react';

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

   
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