import styled from 'styled-components';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 15%;
  border-right: 1px solid hsl(var(--border));
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4em;
  border-bottom: 1px solid hsl(var(--border));
  padding: 0 1em;
  margin: 0; /* Ensure no margin */
`;

const Brand = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: hsl(var(--foreground));
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin: 0.5em; /* Ensure no margin */
`;

const SidebarNav = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 1.5em 1em;
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75em;
  padding: 0.75em 1em;

  border-radius: 0.375em;
  color: hsl(var(--muted-foreground));
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: hsl(var(--muted));
    color: hsl(var(--foreground));
  }

  &.active {
    background-color: hsl(var(--muted));
    color: hsl(var(--primary));
  }
`;


const SidebarFooter = styled.div`
  margin-top: auto;
  border-top: 1px solid hsl(var(--border));
  padding: 1.5em 1em;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0.5em;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;

  &:hover {
    background-color: hsl(var(--muted));
  }
`;

const Badge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  height: 1.5em;
  width: 1.5em;
  border-radius: 50%;
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
`;

const Card = styled.div`
  background-color: hsl(var(--card));
  border-radius: var(--radius);
  padding: 1em;
  border: 1px solid hsl(var(--border));
`;

const CardHeader = styled.div`
  margin-bottom: 1em;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.25em;
`;

const CardDescription = styled.p`
  margin: 0;
  color: hsl(var(--muted-foreground));
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75em;
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 1em;
  text-align: center;

  &:hover {
    background-color: hsl(var(--secondary));
  }
`;

function Sidebar() {
  const [activeLink, setActiveLink] = useState('dashboard');

  // Ensure active link is determined before rendering
  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <Link href="/" passHref>
          <Brand>
            <span>Protravel</span>
          </Brand>
        </Link>
        <IconButton>
        </IconButton>
      </SidebarHeader>

      <SidebarNav>
        <Link href="/" passHref>
          <NavLink onClick={() => setActiveLink('/dashboard')} className={activeLink === '/dashboard' ? 'active' : ''}>
            <HomeIcon />
            <span>Dashboard</span>
          </NavLink>
        </Link>
        <Link href="/orders" passHref>
          <NavLink onClick={() => setActiveLink('/orders')} className={activeLink === '/orders' ? 'active' : ''}>
            <ShoppingCartIcon />
            <span>Orders</span>
            <Badge>6</Badge>
          </NavLink>
        </Link>
        <Link href="/products" passHref>
          <NavLink onClick={() => setActiveLink('/products')} className={activeLink === '/products' ? 'active' : ''}>
            <PackageIcon />
            <span>Products</span>
          </NavLink>
        </Link>
        <Link href="/customers" passHref>
          <NavLink onClick={() => setActiveLink('/customers')} className={activeLink === '/customers' ? 'active' : ''}>
            <UsersIcon />
            <span>Customers</span>
          </NavLink>
        </Link>
        <Link href="/analytics" passHref>
          <NavLink onClick={() => setActiveLink('/analytics')} className={activeLink === '/analytics' ? 'active' : ''}>
            <LineChartIcon />
            <span>Analytics</span>
          </NavLink>
        </Link>
        <Link href="/settings" passHref>
          <NavLink onClick={() => setActiveLink('/settings')} className={activeLink === '/settings' ? 'active' : ''}>
            <SettingsIcon />
            <span>Settings</span>
          </NavLink>
        </Link>
      </SidebarNav>

      <SidebarFooter>

      </SidebarFooter>
    </SidebarContainer>
  );
}

export default Sidebar;



// Icons components (BellIcon, HomeIcon, ShoppingCartIcon, etc.) go here, similar to the original provided icons.

function BellIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    );
  }
  
  // Repeat similar for HomeIcon, ShoppingCartIcon, etc.

  
  function HomeIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    );
  }
  
  // Repeat similar for HomeIcon, ShoppingCartIcon, etc.

  
  function ShoppingCartIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    );
  }
  
  // Repeat similar for HomeIcon, ShoppingCartIcon, etc.
  

  function MountainIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    );
  }
  

  function PackageIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    );
  }
  

  function UsersIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    );
  }
  
  function LineChartIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    );
  }
  

  function SettingsIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    );
  }