// components/ProtectedRoute.js

"use client"; // Add this line to make it a client component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient'; // Adjust the path as necessary

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        // Redirect to home if there's an error or the user is not logged in
        router.push('/');
      } else {
        setUser(session.user);
      }
    };

    checkUser();
  }, [router]);

  return user ? children : null; // Only render children if the user is logged in
};

export default ProtectedRoute;
