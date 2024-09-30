import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function OnlyBuyerPrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);

    return currentUser.role=="buyer" ? <Outlet /> : <Navigate to='/sign-in'/>
}
