import React from "react";
import Head from "next/head";
import Header from "../components/general/header";
import AddPropretiyForm from "../components/components/addPropretyForm";

export default function Publication() {
	return (
		<>
			<Head>
				<title>Zubu</title>
				<meta
					name="description"
					content="Chercher un maison à louer à Kinshasa."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Header />
				<div className="publication_section">
					<AddPropretiyForm />
				</div>
			</main>
		</>
	);
}
