"use client"; // Add this line to make the component a Client Component

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient'; // Adjust the path as necessary
import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';


import './globals.css';
// Inside RootLayout.js

const RootLayout = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  
  // Fetch the current user on component mount
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        return;
      }
      setUser(session?.user || null);
    };

    fetchSession();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      router.push('/login'); // Redirect to login page after logout
    }
  };

  return (
    <html lang="en" data-theme={useTheme().theme}> 
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider attribute='class'>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <Link href="/" className="navbar-brand">Home</Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                  {user ? (
                    <>
                      <li className="nav-item">
                        <Link href="/dashboard" className="nav-link">Dashboard</Link>
                      </li>
                      <li className="nav-item">
                        <button onClick={handleLogout} className="nav-link btn btn-link">Logout</button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link href="/login" className="nav-link">Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/signup" className="nav-link">Signup</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <ThemeToggleButton />
            </div>
          </nav>
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
};

// Inside your RootLayout.js

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Use useEffect to set isMounted to true after the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render the button until mounted to avoid hydration issues
  if (!isMounted) {
    return null; // Or return a placeholder if you prefer
  }

  const toggleTheme = () => {
    console.log("Current Theme:", theme); // Log the current theme
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme} className="btn btn-secondary">
      Toggle to {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
};


export default RootLayout;