import { config } from 'dotenv';
config();

//env keys are shown since idk if u will have access to it or nah

export const CONFIG = {
    secrets: {
		companyName: "goMart",
        clientID: process.env.clientID || "3b463ad5-ea85-431f-8d22-5c77179b3f8d",
        clientSecret: process.env.clientSecret || "ByNfoNAGsyfHKgZj",
        ownerName: "SUVAN GOWRI SHANKER",
        ownerEmail: "ss9696@srmist.edu.in",
        rollNo: "RA2211003010670",

	},
    upstash: {
        UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL || 'https://exotic-cowbird-23626.upstash.io',
        UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || 'AVxKAAIjcDE0ZDkzZjQ0OTE5NzM0NWI4OWUxMjQwNWUwOGY4MDIyY3AxMA'
    },
    api: {
        url: "http://20.244.56.144"
    }
};