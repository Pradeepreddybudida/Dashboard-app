"use client"; // Add this line to make the component a Client Component

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient'; // Adjust the path as necessary
import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';

export default function RootLayout({ children }) {
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

  // Logout function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      router.push('/login'); // Redirect to login page after logout
    }
  };

  return (
   
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
        <ThemeProvider attribute='class' > {/* ThemeProvider wraps everything */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <Link href="/" className="navbar-brand">Dashboard</Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                  
                      <li className="nav-item">
                        <Link href="/login" className="nav-link">Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/signup" className="nav-link">Signup</Link>
                      </li>
                  
                      <li className="nav-item">
                        <Link href="/dashboard" className="nav-link">Dashboard</Link>
                      </li>
                      <li className="nav-item">
                        <button onClick={handleLogout} className="nav-link btn btn-link">Logout</button>
                      </li>
                  
                </ul>
              </div>
             <ThemeToggleButton /> {/* Add the toggle button here */}
            </div>
          </nav>
          <div >{children}</div>
          </ThemeProvider>
        </body>
      </html>
    
  );
}

// Theme toggle button component
const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme} className="btn btn-secondary">
      Toggle to {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
};
