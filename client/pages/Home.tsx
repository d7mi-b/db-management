import React, { useState } from "react";

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
    const [system, setSystem] = useState<string | null>(null);
    const [host, setHost] = useState<string>('');
    const [port, setPort] = useState<string>('');

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
                    <form className="rounded">
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
                            <input type="text" name="host" value={host} onChange={(e) => setHost(e.target.value)} />
                        </section>

                        <section>
                            <label htmlFor="port">Port</label>
                            <input type="text" name="port" value={port} onChange={(e) => setPort(e.target.value)} />
                        </section>

                        <section className="btn-container center">
                            <button className="btn">Connect</button>
                        </section>
                    </form>
                </section>
            }

            {/* <section className="bg-icon absolute bottom-0 left-0">
                <i className="fi fi-ts-database"></i>
            </section> */}
        </main>
    );
}

export default Home;