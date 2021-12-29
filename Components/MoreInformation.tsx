import React, {FunctionComponent, useEffect, useState} from "react";
import {Session} from "next-auth";
import UserContainer from "./UserContainer";

interface Props {
    session: Session | null,
    reload: boolean
}

interface user {
    name: string,
    image: string
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


const MoreInformation: FunctionComponent<Props> = (props) => {

    const [users, setUsers] = useState<user[]>([]);
    const [lastWinner, setLastWinner] = useState<user>({
        name: 'None',
        image: 'https://staging.thalia.nu/static/members/images/default-avatar.jpg',
        wash: 0
    });

    useEffect(() => {
        if (props.session) {
            fetch('/api/db', {
                method: "PUT",
                body: JSON.stringify({action: "?getLeaderboard"})
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then((users) => {
                        setUsers(users)
                    })
                }
            })

            fetch('/api/db', {
                method: "PUT",
                body: JSON.stringify({action: "?getLastWinner"})
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then((user) => {
                        console.log("winner", user)
                        if(user !== null) {
                            setLastWinner(user)
                        }
                    })
                }
            })

        }
    }, [props.session, props.reload])

    return (
        <div className={"py-8 flex self-center justify-center bg-white"}>
            <div>
                <h1 className={"text-3xl text-center mb-8 text-black"}>More information</h1>
                {props.session &&
                    <div className={"grid lg:grid-cols-2 grid-cols-1 gap-12 place-content-around "}>
                        <div className={"flex justify-center"}>
                            <div className={"bg-primary rounded-lg"}>
                            <div className={"sm:m-10 my-10"}>
                                <h2 className={"text-center text-white text-xl"}>Last months winner</h2>
                            <UserContainer image={lastWinner.image} name={lastWinner.name} score={lastWinner.wash}
                                           number_one={true}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h1 className={"text-center text-black text-xl mb-10"}> Full leaderboard</h1>
                            <div className={"overflow-hidden border-b border-gray-200 rounded-lg shadow-lg self-center"}>
                                <table className=" table-auto divide-gray-00">
                                    <thead className={"bg-primary"}>
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
                    </div>
                }
                {!props.session &&
                    <p className={"text-lg text-center mb-8 text-black"}>(Please login first)</p>
                }
            </div>
        </div>
    )
};

export default MoreInformation;