import React, { useContext } from 'react'
import  DashHeader from './dashHeader'
import { UserContext } from '../../context/user/userContext';
import ProfessionRegistration from '../professional/registration';
import Profile from '../professional/profile';
import Services from '../professional/services';
import Uploads from '../professional/uploads'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Professional = () => {
    const user = useContext(UserContext);

    return (
        <div>
            <DashHeader user={user} />
            { user.profession ? <ProfessionalHome user={user} /> : <ProfessionRegistration user={user} /> }
        </div>
    );
}

const ProfessionalHome = ({user}) => {
    return (
        <div className="my-2">
            <Tabs direction={'rtl'}>
                <TabList>
                    <Tab>Profile</Tab>
                    <Tab>Services</Tab>
                    <Tab>Uploads</Tab>
                </TabList>

                <TabPanel>
                    <h2 className="border-bottom border-info text-muted">Profile</h2>
                    <Profile user={user} />
                </TabPanel>
                <TabPanel>
                    <h2 className="border-bottom border-info text-muted">Services</h2>
                    { user.profession_verified ? <Services /> : 
                        <div className="row">
                            <div className="col-12">
                                <h4>Verification Pending</h4>
                                <p>Your documents are still pending evaluation to establish your scope of practice before we can allow you to enlist to any service. This is in accordance to the regulations regarding the health profession.</p>
                            </div>
                        </div>
                    }
                </TabPanel>
                <TabPanel>
                    <h2 className="border-bottom border-info text-muted">Uploads</h2>
                    <Uploads user={user} />
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default Professional;