import { config } from 'dotenv';
config();

export const CONFIG = {
    secrets: {
		companyName: "goMart",
        clientID: process.env.clientID || "3b463ad5-ea85-431f-8d22-5c77179b3f8d",
        clientSecret: process.env.clientSecret || "ByNfoNAGsyfHKgZj",
        ownerName: "SUVAN GOWRI SHANKER",
        ownerEmail: "ss9696@srmist.edu.in",
        rollNo: "RA2211003010670",

	},
    api: {
        url: "http://20.244.56.144"
    }
};