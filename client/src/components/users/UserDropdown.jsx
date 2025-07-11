import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  IconChevronDown,
  IconChevronUp,
  IconUserCircle,
  IconSettings,
} from '@tabler/icons-react';

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 text-2xl font-semibold transition-colors duration-300 text-white hover:text-yellow-200"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span>User Menu</span>
        {open ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
      </button>

      {open && (
        <div
          id="user-dropdown"
          role="menu"
          className="absolute left-0 mt-2 w-64 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in"
        >
          <ul className="py-2 text-base font-poppins text-gray-800">
            <li>
              <Link
                to="/user-dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-900 transition-colors duration-200"
              >
                <IconUserCircle size={16} />
                Dashboard
              </Link>
            </li>
            {/* Future user links */}
            <li>
              <Link
                to="/user-settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-6 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-900 transition-colors duration-200"
              >
                <IconSettings size={16} />
                Settings
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
