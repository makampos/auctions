'use client'
import AuctionCard from "@/app/auctions/AuctionCard";
import {Auction, PagedResult} from '../../types/Index';
import AppPagination from "@/app/components/AppPagination";
import {useEffect, useState} from "react";
import {getData} from "@/app/actions/auctionAction";
import Filter from "@/app/auctions/Filters";
import {useParamsStore} from "@/hooks/UseParamsStore";
import {shallow} from "zustand/shallow";
import qs from 'query-string';

export default function Listings(){
    const [data, setData] = useState<PagedResult<Auction>>();

    const params = useParamsStore(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy
    }), shallow);

    const setParams = useParamsStore(state => state.setParams);
    const url = qs.stringifyUrl({url: '', query: params});

    function setPageNumer(pageNumber: number){
        setParams({pageNumber});
    }

    useEffect(() => {
        getData(url).then(data => {
           setData(data);
        })
    }, [url]);

    if(!data){
        return <h3>Loading...</h3>
    }
    return(
        <>
            <Filter />
            <div className='grid grid-cols-4 gap-6'>
                {data.results.map(auction => (
                    <AuctionCard auction={auction} key={auction.id}/>
                ))}
            </div>
            <div className='flex justify-center mt-4'>
                <AppPagination
                    pageChanged={setPageNumer} currentPage={params.pageNumber} pageCount={data.pageCount} />
            </div>
        </>
    )
}