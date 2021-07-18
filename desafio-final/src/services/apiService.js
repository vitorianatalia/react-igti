import { getYear } from "./httpService";

const CACHE = {};

export async function apiGetAllMatches(year) {
    const allMatches = await getYear(`/${year}`);
    CACHE["Matches"] = allMatches;
    return allMatches;
}