import React from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import UserManagement from './components/UserManagement'; // ✅ Import UserManagement

function App() {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar activeTab="users" setActiveTab={() => { }} /> {/* activeTab = "users" */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="User Management" /> {/* Header title */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {/* UserManagement component call */}
                    <UserManagement />
                </main>
            </div>
        </div>
    )
}

export default App;
