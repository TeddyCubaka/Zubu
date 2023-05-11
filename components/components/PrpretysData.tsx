import React, { useState, useEffect } from "react";
import { publicationStore } from "../../store/publicationStore";
import { shallow } from "zustand/shallow";
import axios from "axios";
import { InputHasDetails, InputLabelLess } from "../atoms/form";
import { PrimaryButton } from "../atoms/button";
import SetCurrency from "../atoms/currencyButtons";

interface RentalPrice {
	price: string;
	guaranteeValue: string;
	monetaryCurrency: string;
}

interface Address {
	number: string;
	avenue: string;
	quoter: string;
	township: string;
	city: string;
}

export function GetAddress() {
	const [setAddres, address] = publicationStore(
		(state) => [state.setAddress, state.address],
		shallow
	);
	const [addressSplited, setAddressSplited] = useState<Address>({
		number: address.split("/")[0] || "",
		avenue: address.split("/")[1] || "",
		quoter: address.split("/")[2] || "",
		township: address.split("/")[3] || "",
		city: address.split("/")[4] || "",
	});

	const validator = (string: string) => (string.length > 0 ? string + "/" : "");

	useEffect(() => {
		setAddres(
			validator(addressSplited.number) +
				validator(addressSplited.avenue) +
				validator(addressSplited.city) +
				validator(addressSplited.quoter) +
				(addressSplited.township.length > 0
					? addressSplited.township
					: "//////////")
		);
	}, [
		addressSplited.avenue,
		addressSplited.city,
		addressSplited.number,
		addressSplited.quoter,
		addressSplited.township,
		setAddres,
	]);

	return (
		<div className="flex flex-col flex-wrap gap-2">
			<label>
				Address <span className="text-red-600">*</span>
			</label>
			<div className="flex flex-wrap gap-2.5 items-center">
				<InputLabelLess
					value={addressSplited.number}
					sendToStore={(e) => {
						typeof e == "number"
							? ""
							: setAddressSplited((prev) =>
									Number(e) || e === "" ? { ...prev, number: e } : { ...prev }
							  );
					}}
					subject={"N° : "}
					maxLength={4}
					customClass={" w-[60px] flex-none"}
					placeholder={"n°.."}
				/>
				<InputLabelLess
					value={addressSplited.avenue}
					sendToStore={(e) =>
						typeof e == "number"
							? ""
							: setAddressSplited((prev) => ({ ...prev, avenue: e }))
					}
					subject="avenue ou rue : "
					customClass={" flex-1 md:min-w-[200px] max-md:min-w-[120px] "}
					placeholder="renseigner l'avenue"
				/>
				<InputLabelLess
					value={addressSplited.quoter}
					sendToStore={(e) =>
						typeof e == "number"
							? ""
							: setAddressSplited((prev) => ({ ...prev, quoter: e }))
					}
					subject={"quartier : "}
					customClass={" flex-1 md:min-w-[200px] max-md:min-w-[120px] "}
					placeholder="renseigner le quartier"
				/>
				<InputLabelLess
					value={addressSplited.township}
					sendToStore={(e) =>
						typeof e == "number"
							? ""
							: setAddressSplited((prev) => ({ ...prev, township: e }))
					}
					subject=""
					customClass={" flex-1 md:min-w-[200px] max-md:min-w-[120px] "}
					placeholder="renseigner la commune"
				/>
				<InputLabelLess
					value={addressSplited.city}
					sendToStore={(e) =>
						typeof e == "number"
							? ""
							: setAddressSplited((prev) => ({ ...prev, city: e }))
					}
					subject=""
					customClass={" flex-1 md:min-w-[200px] max-md:min-w-[120px] "}
					placeholder="renseigner la ville"
				/>
			</div>
		</div>
	);
}

export function GetPropretyType() {
	const [setPropretyType, propretyType] = publicationStore(
		(state) => [state.setPropretyType, state.propretyType],
		shallow
	);
	const propretyTypeChoices = [
		"maison meublé",
		"maison vide",
		"appartement",
		"commerce",
		"bureau",
	];

	return (
		<div className="flex flex-col gap-2">
			<label>
				Type du bien <span className="text-red-600">*</span>
			</label>
			<InputHasDetails
				detailsData={propretyTypeChoices}
				store={propretyType}
				sendToStore={setPropretyType}
			/>
		</div>
	);
}

export function GetLosor() {
	const [setLessor, lessor] = publicationStore(
		(state) => [state.setLessor, state.lessor],
		shallow
	);

	return (
		<>
			<div className="flex flex-col gap-2">
				<label>
					Identité du bailleur ( nom et postnom ){" "}
					<span className="text-red-600">*</span>
				</label>
				<InputLabelLess
					value={lessor.fullName}
					sendToStore={(e) => {
						typeof e == "number" ? "" : setLessor({ ...lessor, fullName: e });
					}}
					subject={"Nom complet : "}
					customClass={"w-full"}
					placeholder={"nom du bailleur ici"}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label>
					Contact du bailleur <span className="text-red-600">*</span>
				</label>
				<InputLabelLess
					value={lessor.contacts}
					sendToStore={(e) => {
						typeof e == "number" ? "" : setLessor({ ...lessor, contacts: e });
					}}
					subject={"numéro de téléphone ou mail : "}
					customClass={"w-full"}
					placeholder="Ex : +243 990 000 000 ou user@gmail.com"
				/>
			</div>
		</>
	);
}

export function GetPrice() {
	const [setRentalPrice, rentalPrice] = publicationStore(
		(state) => [state.setRentalPrice, state.rentalPrice],
		shallow
	);

	return (
		<>
			<div className="flex flex-col gap-2">
				<label>
					Prix du loyer <span className="text-red-600">*</span>
				</label>
				<InputLabelLess
					value={rentalPrice.price}
					sendToStore={(e) => {
						typeof e == "number"
							? ""
							: setRentalPrice({
									...rentalPrice,
									price: Number(e) || e === "" ? e : rentalPrice.price,
							  });
					}}
					subject={"Nom complet : "}
					customClass={"w-full"}
					placeholder="Ex : 300 ou 600 000"
					children={
						<SetCurrency
							setRentalPrice={setRentalPrice}
							rentalPrice={rentalPrice}
						/>
					}
				/>
			</div>
			<div className="flex flex-col gap-2 ">
				<label>
					Nombre de mois de la garantie <span className="text-red-600">*</span>
				</label>
				<InputLabelLess
					value={rentalPrice.guaranteeValue}
					maxLength={2}
					sendToStore={(e) =>
						setRentalPrice({
							...rentalPrice,
							guaranteeValue:
								Number(e) || e === "" ? e + "" : rentalPrice.guaranteeValue,
						})
					}
					subject={"Nom complet : "}
					customClass={"w-full"}
					placeholder="Ex : 4"
				/>
			</div>
		</>
	);
}

export function ViewInformationPuted() {
	const publish = publicationStore();
	function lengthVerificator(arr: string[]): boolean {
		if (arr.filter((str) => str.toString().length > 0).length === arr.length)
			return true;
		else return false;
	}
	const postDataToServer = () => {
		publish.setDatabaseResponseStatus("");
		if (
			lengthVerificator([
				publish.address,
				publish.rentalPrice.guaranteeValue,
				publish.rentalPrice.price,
			])
		) {
			publish._setSendingData(true);
			axios({
				method: "post",
				url: process.env.NEXT_PUBLIC_DB_SERVER_URL + "/proprety",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("zubu_token"),
				},
				data: {
					owner: localStorage.getItem("zubu_user_id"),
					rentalInformation: {
						address: publish.address,
						RentalType: publish.propretyType,
						lessor: publish.lessor,
						price: publish.rentalPrice.price,
						guaranteeValue: publish.rentalPrice.guaranteeValue,
						monetaryCurrency: publish.rentalPrice.monetaryCurrency,
					},
				},
			})
				.then((res) => {
					publish.setDatabaseResponseStatus("created");
					publish.set_id(res.data.data._id);
					publish._setSendingData(false);
				})
				.catch(() => {
					publish.setDatabaseResponseStatus("not created");
					publish._setSendingData(false);
				});
		}
	};

	return (
		<>
			<PrimaryButton
				conditionToPass={lengthVerificator([
					publish.address,
					publish.rentalPrice.guaranteeValue,
					publish.rentalPrice.price,
				])}
				doOnClick={() => {
					postDataToServer();
					publish.setCount();
				}}
				subject="Publier le bien"
				doIfConditionDoesNotPass={() => {}}
			/>
		</>
	);
}
