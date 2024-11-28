import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import usePost from "../hooks/usePost";
import { useSystemContext } from "../hooks/useSystemContext";

const databaseSystems = [
    {
        id: 1,
        name: "MySQL",
        logo: "images/mysql.svg"
    },
    {
        id: 2,
        name: "MongoDB",
        logo: "images/mongodb.svg"
    },
    {
        id: 3,
        name: "PostgreSQL",
        logo: "images/postgresql.svg"
    }
]

const Home = () => {
    const { dispatch } = useSystemContext();
    const [system, setSystem] = useState<string | null>(null);

    const { post: connection, result, error, setBody } = usePost('/system/connect', );

    async function connect (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = new FormData(e.target as HTMLFormElement);
        const body = Object.fromEntries(form.entries());
        console.log("body: ", body);
        

        if (system) {
            setBody({
                system,
                config: body
            });
    
            setTimeout(() => {
                connection.mutate();
            }, 100); 
        }
    }

    useEffect(() => {
        if (result && system) {
            localStorage.setItem('system', system);
            dispatch({ type: "CONNECT", payload: system })
        }
    }, [result]);

    return (
        <main className="center page py-16">
            <header>
                <h1 className="text-4xl flex gap-2 items-center mb-2">
                    Welcome to Databases Management
                </h1>
            </header>

            <section className="text-center">
                <p className="text-lg">choose the database system you want to connect with it</p>
            </section>

            {
                !system &&
                <section className="flex gap-3 my-5">
                    {
                        databaseSystems.map(system => {
                            return (
                                <article 
                                    className={`
                                        p-8 border border-[--hover-color] w-full center 
                                        bg-[--card-color] hover:bg-[--hover-color] rounded 
                                        cursor-pointer w-40
                                    `}
                                    key={system.id}
                                    onClick={() => setSystem(system.name)}
                                >
                                    <section className="w-full">
                                        <img src={system.logo} alt={`${system.name} Logo`} className="w-32" />
                                    </section>
                                </article>
                            );
                        })
                    }
                </section>
            }

            {
                system &&
                <section className="w-full my-8">
                    <form className="rounded" onSubmit={connect}>
                        <section>
                            <label htmlFor="system" className="block">Database System</label>

                            <section className="flex gap-3 my-5">
                                {
                                    databaseSystems.map(db => {
                                        return (
                                            <article 
                                                className={`
                                                    p-4 border border-[--hover-color] w-full center 
                                                    bg-[#fff] hover:bg-[--hover-color] rounded 
                                                    cursor-pointer w-24
                                                    ${system === db.name ? 'bg-[--hover-color]' : ''}
                                                `}
                                                key={db.id}
                                                onClick={() => setSystem(db.name)}
                                            >
                                                <section className="w-full">
                                                    <img src={db.logo} alt={`${db.name} Logo`} className="w-full" />
                                                </section>
                                            </article>
                                        );
                                    })
                                }
                            </section>
                        </section>

                        <section>
                            <label htmlFor="host">Host</label>
                            <input type="text" name="host" defaultValue='localhost' />
                        </section>

                        <section>
                            <label htmlFor="port">Port</label>
                            <input type="text" name="port" defaultValue='3306' />
                        </section>

                        <section>
                            <label htmlFor="user">User</label>
                            <input type="text" name="user" defaultValue='root' />
                        </section>

                        <section>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" defaultValue='2546' />
                        </section>

                        <section className="btn-container center disabled:opacity-50">
                            <button disabled={connection.isLoading} className="btn">Connect</button>
                        </section>
                    </form>
                </section>
            }
        </main>
    );
}

export default Home;