'use server'

import {Auction, PagedResult} from "../../types/Index";

export async function getData(pageNumber: number = 1) : Promise<PagedResult<Auction>>{
    const res = await fetch(`http://localhost:6001/search?pageSize=2&pageNumber=${pageNumber}`)

    if(!res.ok) throw Error('Failed to fetch data')

    return res.json();
}