import React, {FunctionComponent, useEffect, useState} from "react";
import {Session} from "next-auth";

interface Props {
    session: Session | null,
}

interface user {
    name: string,
    wash: number,
}

interface TableProp {
    users: user[]
}

const FillTable: FunctionComponent<TableProp> = (props) => {
    const data = [];

    for (let i = 0; i < props.users.length; i++) {
        data.push(
            <tr key={"leaderboard-" + i}>
                <td className={"px-5 md:px-24 py-3 text-left text-md font-medium text-black"}>{props.users[i].name}</td>
                <td className={"px-5 md:px-24 py-3 text-left text-md font-medium text-black"}>{props.users[i].wash}</td>
            </tr>
        )
    }
    return (<>{data}</>)
}

const UserTable: FunctionComponent<Props> = (props) => {

    const [users, setUsers] = useState<user[]>([]);

    useEffect(() => {
        console.log("YES!")
        if (props.session) {
            fetch('/api/db', {
                method: "PUT",
                body: JSON.stringify({action: "?getLeaderboard"})
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then((users) => {
                        console.log(users)
                        setUsers(users)
                    })
                }
            })
        }
    }, [props.session])

    return (
        <div className={"py-8 w-screen flex self-center justify-center"}>
            <div>
                <h1 className={"text-3xl text-center mb-8 text-black"}>Full leaderboard</h1>
                {props.session &&
                    <div className="flex flex-col shadow-lg">
                        <div className={"shadow overflow-hidden border-b border-gray-200 rounded-lg"}>
                            <table className=" table-auto divide-gray-00">
                                <thead className={"bg-primary "}>
                                <tr>
                                    <th scope="col"
                                        className={"px-5 md:px-24 py-3 text-left text-md font-medium text-white"}>Name
                                    </th>
                                    <th scope="col"
                                        className={"px-5 md:px-24 py-3 text-left text-md font-medium text-white"}>Number
                                        of washes
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                <FillTable users={users}/>
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
                {!props.session &&
                    <p className={"text-lg text-center mb-8 text-black"}>(Please login first)</p>
                }
            </div>
        </div>
    )
};

export default UserTable;