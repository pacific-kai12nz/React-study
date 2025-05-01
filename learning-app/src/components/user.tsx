import React from "react";

// TypeScriptでモジュールとして認識されるように、export文を使用する

// ユーザーの型定義
export type UserProps = {
    id: number;
    name: string;
    email: string;
    role?: string;
};

const User: React.FC<UserProps> = ({id, name, email, role = 'User'}) => {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '10px',
            margin: '10px 0'
        }}>
            <h3>{name}</h3>
            <p>ID: {id}</p>
            <p>Email: {email}</p>
            <p>役割: {role}</p>
        </div>
    );
};

export default User;
