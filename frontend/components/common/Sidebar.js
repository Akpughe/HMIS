import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import Navbrand from './Navbrand';
import Link from 'next/link';

const Sidebar = ({ loadUser, auth: { user, isAuthenticated } }) => {
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <nav className="bg-white h-screen shadow-xl w-72 fixed pt-16 ">
      <div className="p-7">
        <div className="flex flex-col space-y-4">
          {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
          <Link href="/dashboard">
            <a className="text-gray-500 border-l-4 border-blue-600 px-5 py-4 text-sm font-medium">
              {user.accountType !== 'Administrator' ? 'Overview' : 'Dashboard'}
            </a>
          </Link>
          <Link href="/appointments">
            <a
              // class="text-gray-500 hover:border-blue-600 border-l-4 px-5 py-4 text-sm font-medium "
              className={
                selected === true
                  ? `text-gray-500 border-l-4 hover:border-blue-600 border-l-4 px-5 py-4 text-sm font-medium`
                  : `text-gray-500 hover:border-blue-600 border-l-4 px-5 py-4 text-sm font-medium`
              }
              onClick={setSelected}
            >
              {user.accountType !== 'Administrator' ? 'Reports' : 'Appointment'}
            </a>
          </Link>
          <Link
            href={
              user.accountType === 'Administrator'
                ? '/doctor'
                : user.accountType === 'Patient'
                ? '/profile'
                : user.accountType === 'Doctor'
                ? '/patients'
                : ''
            }
          >
            <a className="text-gray-500 hover:border-blue-600 border-l-4 px-5 py-4 text-sm font-medium">
              {/* {user.accountType !== 'Administrator' ? 'Profile' : 'Doctor'} */}
              {user.accountType === 'Administrator'
                ? 'Doctor'
                : user.accountType === 'Patient'
                ? 'Profile'
                : user.accountType === 'Doctor'
                ? 'Patient'
                : ''}
            </a>
          </Link>
          <Link
            href={
              user.accountType === 'Administrator'
                ? '/appointment'
                : user.accountType === 'Patient'
                ? '/schedule'
                : user.accountType === 'Doctor'
                ? '/dap'
                : ''
            }
          >
            <a className="text-gray-500 hover:border-blue-600 border-l-4 px-5 py-4 text-sm font-medium">
              {/* {user.accountType === 'Administrator' ? 'Schedule' : 'Nurses'} */}
              {user.accountType === 'Administrator'
                ? 'Schedule'
                : user.accountType === 'Patient'
                ? 'Schedule'
                : user.accountType === 'Doctor'
                ? 'Appointments'
                : ''}
            </a>
          </Link>
          <Link
            href={
              user.accountType === 'Administrator' && 'Doctor'
                ? '/patients'
                : user.accountType === 'Patient'
                ? '/healthr'
                : ''
            }
          >
            <a className="text-gray-500 hover:border-blue-600 border-l-4 px-5 py-4 text-sm font-medium">
              {user.accountType === 'Administrator' && 'Doctor'
                ? 'Patients'
                : user.accountType === 'Patient'
                ? 'Health Record'
                : ''}
            </a>
          </Link>
          <Link href="/">
            <a className="text-gray-500 hover:border-blue-600 border-l-4 px-5 py-4 text-sm font-medium">
              Settings
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};
Sidebar.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { loadUser })(Sidebar);

// export default Sidebar;
