import React, { Component } from 'react';
import Profile from '../public/profile';
import Services from '../public/services';
import Verification from '../public/verification';
import DashHeader from './dashHeader';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const PublicHome = ({user}) => {
    return (
        <div>
            <DashHeader user={user} />
            <div className="my-2">
                <Tabs direction={'rtl'}>
                    <TabList>
                        <Tab>Profile</Tab>
                        <Tab>Services</Tab>
                        <Tab>Verification</Tab>
                    </TabList>

                    <TabPanel>
                        <h2 className="border-bottom border-info text-muted">Profile</h2>
                        <Profile user={user} />
                    </TabPanel>
                    <TabPanel>
                        <h2 className="border-bottom border-info text-muted">Services</h2>
                        <Services />
                    </TabPanel>
                    <TabPanel>
                        <h2 className="border-bottom border-info text-muted">Verification of identity</h2>
                        <Verification user={user} />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}

export default PublicHome;