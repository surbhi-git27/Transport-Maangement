import React, { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Amit Sharma", email: "amit@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Priya Verma", email: "priya@example.com", role: "Manager", status: "Inactive" },
    { id: 3, name: "Rohit Singh", email: "rohit@example.com", role: "Driver", status: "Active" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", status: "Active" });
  const [editUserId, setEditUserId] = useState<number | null>(null);

  // Add or Update User
  const handleSaveUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) return;

    if (editUserId !== null) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === editUserId ? { ...user, ...newUser } : user
        )
      );
      setEditUserId(null);
    } else {
      // Add new user
      const id = users.length + 1;
      setUsers([...users, { ...newUser, id }]);
    }

    setNewUser({ name: "", email: "", role: "", status: "Active" });
  };

  // Edit button click
  const handleEdit = (user: User) => {
    setNewUser({ name: user.name, email: user.email, role: user.role, status: user.status });
    setEditUserId(user.id);
  };

  // Delete user
  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      {/* Form */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border px-3 py-1 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border px-3 py-1 rounded"
        />
        <input
          type="text"
          placeholder="Role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="border px-3 py-1 rounded"
        />
        <select
          value={newUser.status}
          onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
          className="border px-3 py-1 rounded"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button
          onClick={handleSaveUser}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          {editUserId !== null ? "Update User" : "Add User"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b">Name</th>
              <th className="px-4 py-2 text-left border-b">Email</th>
              <th className="px-4 py-2 text-left border-b">Role</th>
              <th className="px-4 py-2 text-left border-b">Status</th>
              <th className="px-4 py-2 text-center border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{user.name}</td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">{user.role}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2 border-b text-center space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
