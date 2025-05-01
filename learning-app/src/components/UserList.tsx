import React from "react";
import User from "./user";

type UserData = {
    id: number;
    name: string;
    email: string;
    role?: string;
};

type UserListProps = {
    users: UserData[];
};

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <div>
            <h2>ユーザーリスト</h2>
            {users.map(user => (
                <User
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    role={user.role}                 />
            ))}
        </div>
    );
};

export default UserList;